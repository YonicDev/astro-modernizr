import type Modernizr from "modernizr";
import { integration } from "./integration.js";
import modernizr from "modernizr";

interface ModernizrAPI {
    on(feature: string, cb: (result: boolean) => any): void;

    addTest(feature: string, test: (() => boolean) | boolean): ModernizrStatic;
    addTest(feature: Dictionary<any>): ModernizrStatic;

    atRule(prop: string): boolean;

    _domPrefixes: string[];

    hasEvent(eventName: string, element?: EventTarget): boolean;

    mq(mq: string): boolean;

    prefixed(prop: string): string;
    prefixed(prop: string, obj: EventTarget, element?: boolean): any;

    prefixedCSS(prop: string): string;

    prefixedCSSValue(prop: string, value: string): boolean;

    _prefixes: string[];

    testAllProps(prop: string, value?: string, skipValueTest?: boolean): boolean;

    testProp(prop: string, value?: string, useValue?: boolean): boolean;

    testStyles(
        rule: string,
        callback: (elem: HTMLDivElement, rule: string) => void,
        nodes?: number,
        testnames?: string[],
    ): boolean;
}

export type FeatureDetects = Partial<Omit<typeof modernizr, keyof ModernizrAPI>>

export type Modernizr = typeof modernizr;
export default integration;