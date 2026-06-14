import { forwardRef, useMemo, useRef, useEffect, useCallback } from "react";
import "./VariableProximity.css";

function useMousePositionRef(containerRef, onPositionChange) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
      if (onPositionChange) onPositionChange();
    };

    const handleMouseMove = (event) => updatePosition(event.clientX, event.clientY);
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef, onPositionChange]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 800, 'opsz' 40",
    containerRef,
    radius = 50,
    falloff = "linear",
    className = "",
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const letterCentersRef = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const needsMeasureRef = useRef(true);
  const lastPositionRef = useRef({ x: null, y: null });
  const frameRef = useRef(null);

  const calculateDistance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

  const calculateFalloff = useCallback((distance) => {
    const normalized = Math.min(Math.max(1 - distance / radius, 0), 1);

    switch (falloff) {
      case "exponential":
        return normalized ** 2;
      case "gaussian":
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case "linear":
      default:
        return normalized;
    }
  }, [falloff, radius]);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(",")
          .map((setting) => setting.trim())
          .map((setting) => {
            const [name, value] = setting.split(" ");
            return [name.replace(/["']/g, ""), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const runUpdate = useCallback(() => {
    if (!containerRef?.current) return;

    if (needsMeasureRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      letterCentersRef.current = letterRefs.current.map((letterRef) => {
        if (!letterRef) return null;
        const rect = letterRef.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      });
      needsMeasureRef.current = false;
    }

    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const center = letterCentersRef.current[index];
      if (!center) return;

      const distance = calculateDistance(x, y, center.x, center.y);
      if (distance >= radius) {
        if (interpolatedSettingsRef.current[index] !== fromFontVariationSettings) {
          interpolatedSettingsRef.current[index] = fromFontVariationSettings;
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
        }
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const nextSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      if (interpolatedSettingsRef.current[index] !== nextSettings) {
        interpolatedSettingsRef.current[index] = nextSettings;
        letterRef.style.fontVariationSettings = nextSettings;
      }
    });
  }, [
    calculateFalloff,
    containerRef,
    fromFontVariationSettings,
    parsedSettings,
    radius,
  ]);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      runUpdate();
    });
  }, [runUpdate]);

  const mousePositionRef = useMousePositionRef(containerRef, scheduleUpdate);

  useEffect(() => {
    needsMeasureRef.current = true;
    interpolatedSettingsRef.current = [];
    lastPositionRef.current = { x: null, y: null };
    scheduleUpdate();
  }, [label, fromFontVariationSettings, toFontVariationSettings, scheduleUpdate]);

  useEffect(() => {
    if (!containerRef?.current) return undefined;

    const markForMeasure = () => {
      needsMeasureRef.current = true;
      scheduleUpdate();
    };

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(markForMeasure)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", markForMeasure);
    window.addEventListener("scroll", markForMeasure, true);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", markForMeasure);
      window.removeEventListener("scroll", markForMeasure, true);
    };
  }, [containerRef, scheduleUpdate]);

  useEffect(() => {
    scheduleUpdate();
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scheduleUpdate]);

  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: "inline", ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;

            return (
              <span
                key={currentLetterIndex}
                ref={(element) => {
                  letterRefs.current[currentLetterIndex] = element;
                  if (element) {
                    element.style.fontVariationSettings = fromFontVariationSettings;
                  }
                }}
                style={{
                  display: "inline-block",
                  willChange: "font-variation-settings",
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentLetterIndex] ?? fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;
