import { Renderer } from "./renderer";

const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("gpx-main");

const renderer = new Renderer(canvas);

renderer.Initialize();
