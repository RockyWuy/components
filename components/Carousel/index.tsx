import * as React from 'react';

import IndicatorDot from './Dot';
import { SlideList } from './SlideList';
import { Frame } from './Frame';
import { SlideItem } from './SlideItem';

import { tweenFunction } from '@utils/animation';
import { getPosition } from '@utils/index';

const FPS = 60;
const UPDATE_INTERVAL = 1000 / FPS;
const THRESHOLD_PERCENTAGE = 0.1;
const MISOPERATION_TIME_PERCENTAGE  = THRESHOLD_PERCENTAGE * 2;

class IProps {
    public children: Array<React.ReactElement<any>> | React.ReactElement<any> | never[] = [];
    public speed: number = 500;
    public height: number = 320;
    public animation: string = 'easeInOutQuad';
    public isAuto: boolean = true;
    public autoPlayInterval: number = 4500;
    public afterChange: () => void;
    public beforeChange: () => void;
    public selectedColor: string;
    public showDots: boolean = true;
}

type Direction = 'left' | 'right';
class IState {
    public currentIndex: number = 1;
    public slideListWidth: number;
    public slideItemWidth: number;
    public startPositionX: number;
    public moveDeltaX: number;
    public translateX: number;
    public direction: Direction | null;
    public total: number;
    public dragging: false;
}

export default class Carousel extends React.Component<IProps, IState> {
    public static defaultProps = new IProps();

    // eslint-disable-next-line react/sort-comp
    private frameRef: React.RefObject<HTMLDivElement> = React.createRef();
    private rafId: number | null;
    private autoPlayTimer: NodeJS.Timeout;

    public constructor(props: IProps) {
        super(props);
        this.state = new IState();
        this.rafId = null;
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    public componentDidMount() {
        // 设置轮播区域的尺寸
        this.setSize();
        // 开启自动播放
        this.setState(() => {
            console.log('sssll', this.shouldAutoPlay);
            this.shouldAutoPlay && this.autoPlay();
        });
        // 监听document, 如果处于隐藏状态, 取消定时器
        document.addEventListener('visibilitychange', () => {
            const isHidden = document.hidden;
            if (isHidden) {
                clearInterval(this.autoPlayTimer);
            } else {
                this.shouldAutoPlay() && this.autoPlay();
            }
        });
    }

    public componentWillUnmount() {
        cancelAnimationFrame(this.rafId!); // ????
        this.rafId = null;
        clearInterval(this.autoPlayTimer);
    }

    public render() {
        const { height, selectedColor, showDots } = this.props;
        const { total, currentIndex, slideItemWidth } = this.state;

        return (
            <Frame ref={this.frameRef} height={height}>
                {this.renderSlideList()}
                {showDots && this.renderDots(total, slideItemWidth, currentIndex, selectedColor)}
            </Frame>
        );
    }

    /**
     * 是否允许自动播放
     * @private
     * @memberof Carousel
     */
    private shouldAutoPlay() {
        const { total } = this.state;
        const { isAuto } = this.props;
        return total - 2 > 1 && isAuto;
    }

    /**
     * 自动播放
     * @private
     * @memberof Carousel
     */
    private autoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
        const { autoPlayInterval } = this.props;
        this.autoPlayTimer = setInterval(() => this.handleSwipe('left'), autoPlayInterval);
    }

    /**
     * 设置轮播区域尺寸
     *
     * @param x
     */
    private setSize(x?: number) {
        const { width } = this.frameRef.current!.getBoundingClientRect(); // 非空断言操作符
        const len = React.Children.count(this.props.children); // 使用count 可避免字符串
        const total = len + 2;

        this.setState({
            slideItemWidth: width,
            slideListWidth: total * width,
            total,
            translateX: -width * this.state.currentIndex,
            startPositionX: x | 0
        });
    }

    /**
     * 渲染提示点
     *
     * @private
     * @param {number} total
     * @param {number} width
     * @param {number} currentIndex
     * @param {string} selectedColor
     * @returns
     * @memberof Carousel
     */
    private renderDots(total: number, width: number, currentIndex: number, selectedColor: string) {
        const dotProps = {
            total, width, currentIndex, selectedColor
        };

        return React.createElement(IndicatorDot, { ...dotProps });
    }

    /**
     * 渲染轮播主区域
     *
     * @private
     * @returns SlideList
     * @memberof Carousel
     */
    private renderSlideList() {
        const { children, height } = this.props;
        const len = React.Children.count(children);

        if (len < 1) {
            return null;
        }

        const { translateX, slideItemWidth, slideListWidth } = this.state;
        const slideItemSize = {
            height,
            width: slideItemWidth
        };

        const slideListProps = {
            translateX,
            width: slideListWidth
        };

        if (len === 1) {
            return (
                <SlideList {...slideListProps}>
                    <SlideItem width={slideItemWidth}>
                        {React.cloneElement(children as React.ReactElement<any>, slideItemSize)}
                    </SlideItem>
                </SlideList>
            );
        }

        const firstElement = children[0]; // 配置 suppressImplicitAnyIndexErrors
        const lastElement = children[len - 1];
        return (
            <SlideList {...slideListProps}>
                <SlideItem width={slideItemWidth}>
                    {React.cloneElement(lastElement, slideItemSize)}
                </SlideItem>
                {React.Children.map(children, (child: React.ReactElement<any>, i: number) => {
                    return (
                        <SlideItem
                            onTouchStart={this.onTouchStart}
                            onTouchMove={this.onTouchMove}
                            onTouchEnd={this.onTouchEnd}
                            width={slideItemWidth}
                            key={i}
                        >
                            {React.cloneElement(child, slideItemSize)}
                        </SlideItem>
                    );
                })}
                <SlideItem width={slideItemWidth}>
                    {React.cloneElement(firstElement, slideItemSize)}
                </SlideItem>
            </SlideList>
        );
    }

    /**
     * 处理触摸起始时的事件
     *
     * @private
     * @param {React.TouchEvent} e
     * @memberof Carousel
     */
    private onTouchStart(e: React.TouchEvent) {
        clearInterval(this.autoPlayTimer);
        const { x } = getPosition(e);
        this.setSize(x);
    }

    /**
     * 触摸滑动时处理事件
     *
     * @private
     * @param {React.TouchEvent} e
     * @memberof Carousel
     */
    private onTouchMove(e: React.TouchEvent) {
        const { slideItemWidth, currentIndex, startPositionX } = this.state;
        const { x } = getPosition(e);
        const deltaX = x - startPositionX;
        const direction = deltaX > 0 ? 'right' : 'left';
        this.setState({
            direction,
            moveDeltaX: deltaX,
            translateX: -(slideItemWidth * currentIndex) + deltaX
        });
    }

    /**
     * 滑动结束处理的事件
     *
     * @private
     * @memberof Carousel
     */
    private onTouchEnd(e: React.TouchEvent) {
        // 重新出发自动播放
        this.shouldAutoPlay() && this.autoPlay();
        const { moveDeltaX, slideItemWidth, direction } = this.state;
        const threshold = slideItemWidth * THRESHOLD_PERCENTAGE;
        const isMove = Math.abs(moveDeltaX) > threshold; // 达到滑动条件
        if (isMove) {
            this.props.beforeChange && this.props.beforeChange();
            this.handleSwipe(direction!);
        } else {
            this.handleMisoperation();
        }
    }

    /**
     * 图片轮播换位
     *
     * @private
     * @memberof Carousel
     */
    private handleSwipe(direction: Direction) {
        const { children, speed } = this.props;
        const { slideItemWidth, currentIndex, translateX } = this.state;
        const count = React.Children.count(children);

        let endValue: number;
        let newIndex: number;
        if (direction === 'left') {
            newIndex = currentIndex !== count ? currentIndex + 1 : 1;
            endValue = -slideItemWidth * (currentIndex + 1);
        } else {
            newIndex = currentIndex !== 1 ? currentIndex - 1 : count;
            endValue = -slideItemWidth * (currentIndex - 1);
        }
        const tweenQueue = this.getTweenQueue(translateX, endValue, speed);
        this.rafId = requestAnimationFrame(() => this.animation(tweenQueue, newIndex));
        this.props.afterChange && this.props.afterChange();
    }

    /**
     * 轮播失败， 回到原地
     *
     * @private
     * @memberof Carousel
     */
    private handleMisoperation() {
        const { speed } = this.props;
        const { slideItemWidth, currentIndex, translateX } = this.state;
        const endValue = -slideItemWidth * currentIndex;
        const tweenQueue = this.getTweenQueue(translateX, endValue, speed * MISOPERATION_TIME_PERCENTAGE);
        this.rafId = requestAnimationFrame(() => this.animation(tweenQueue, currentIndex));
    }

    /**
     * 获取动画轨迹的数组
     *
     * @private
     * @param {number} beginValue
     * @param {number} endValue
     * @param {number} speed
     * @returns
     * @memberof Carousel
     */
    private getTweenQueue(beginValue: number, endValue: number, speed: number) {
        const { animation } = this.props;
        const tweenQueue = [];
        const updateTimes = speed / UPDATE_INTERVAL;
        for (let i = 0; i < updateTimes; i++) {
            tweenQueue.push(tweenFunction[animation](UPDATE_INTERVAL * i, beginValue, endValue, speed) as number);
        }
        return tweenQueue;
    }

    /**
     * 递归调用,根据轨迹运动
     *
     * @private
     * @param {number[]} tweenQueue
     * @param {number} newIndex
     * @memberof Carousel
     */
    private animation(tweenQueue: number[], newIndex: number) {
        if (tweenQueue.length < 1) {
            this.handleOperationEnd(newIndex);
            return;
        }
        this.setState({
            translateX: tweenQueue[0]
        });
        tweenQueue.shift();
        this.rafId = requestAnimationFrame(() => this.animation(tweenQueue, newIndex));
    }

    /**
     * 动画最后一步,归位
     *
     * @private
     * @param {number} newIndex
     * @memberof Carousel
     */
    private handleOperationEnd(newIndex: number) {
        const { slideItemWidth } = this.state;

        this.setState({
            currentIndex: newIndex,
            translateX: -slideItemWidth * newIndex,
            moveDeltaX: 0,
            dragging: false,
            direction: null,
            startPositionX: 0
        });
    }
}