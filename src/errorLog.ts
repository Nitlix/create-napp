import { red, white } from "kolorist";

export default function(...text: string[]): void {
    console.log(`${red("×")} ${white(text.join(" "))}`)
}