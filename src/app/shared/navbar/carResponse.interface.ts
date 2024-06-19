import { Car } from "./car.interface";

export interface CarResponse {
    content: Car[];
    totalElements: number;
}
