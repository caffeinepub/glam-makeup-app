import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Tutorial {
    title: string;
    duration: bigint;
}
export interface MakeupLook {
    id: bigint;
    title: string;
    created: Time;
    creator: string;
    tags: Array<string>;
    likes: bigint;
    category: Category;
}
export enum Category {
    eyes = "eyes",
    face = "face",
    lips = "lips",
    skincare = "skincare"
}
export interface backendInterface {
    addLook(title: string, category: Category, creator: string, tags: Array<string>): Promise<bigint>;
    getAllLooks(): Promise<Array<MakeupLook>>;
    getAllTutorials(): Promise<Array<Tutorial>>;
    getLooksByCategory(category: Category): Promise<Array<MakeupLook>>;
    likeLook(id: bigint): Promise<void>;
    searchLooksByTag(tag: string): Promise<Array<MakeupLook>>;
}
