/**
 * t: 已消耗时间
 * b:初始位置
 * _c:结束的位置
 * d:总时间
 */
type tweenFunction = (t: number, b: number, _c: number, d: number) => number

const easeInOutQuad: tweenFunction = (t, b, _c, d) => {
    const c = _c - b;
    if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
    } else {
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
};

const linear: tweenFunction = (t, b, _c, d) => {
    const c = _c - b;
    return (c * t) / d + b;
};

export const tweenFunction = {
    easeInOutQuad,
    linear
};