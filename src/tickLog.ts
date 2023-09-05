import { green, white } from "kolorist";

export default function(...text: string[]): void {
    console.log(`${green("√")} ${white(text.join(" "))}`)
}