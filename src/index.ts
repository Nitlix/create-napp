#!/usr/bin/env node

import { bgLightMagenta } from "kolorist";
import prompts from "prompts";
import { downloadAndExtractRepo } from "./create";


async function main(){
    const response = await prompts({
        type: "text",
        name: "value",
        message: "Setup the project in...?",
    })

    console.log(`Initiating in "${response.value}"...`)

    downloadAndExtractRepo(response.value)

    console.log("You're ready to go!")
    console.log(`Run ${bgLightMagenta(`cd ${response.value}`)} and then ${bgLightMagenta("npm i")} to get started!`)
}   

main()