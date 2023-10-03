#!/usr/bin/env node

import { bgLightMagenta } from "kolorist";
import prompts from "prompts";
import { downloadAndExtractRepo } from "./create";
import tickLog from "./tickLog";
import errorLog from "./errorLog";

async function main(){
    const response = await prompts({
        type: "text",
        name: "value",
        message: "Setup the project in (specify folder)...?",
        validate: (value: string) => {
            if (value.length == 0 || !value) {
                return `Please enter a valid path.`
            }
            return true
        }
    }) 


    const types = [
        "NitlixNextTemplate",
        "NitlixTsTemplate"
    ]

    const type = await prompts({
        //choice
        type: "select",
        name: "value",
        message: "What scaffold do you want to start with?",
        choices: types.map((type) => {
            return { title: type, value: type }
        })
    })

    if (!response.value || !type.value) {
        errorLog(`Shutting down...`)
        return
    }

    tickLog(`Initiating in ${response.value}...`)

    try {
        downloadAndExtractRepo(response.value, type.value, "Nitlix")
    }
    catch (error) {
        errorLog(`Failed to download repo.`)
        return
    }

    tickLog("You're ready to go!")
    tickLog(`Run ${bgLightMagenta(`cd ${response.value}`)} and then ${bgLightMagenta("npm i")} to get started!`)
}   

main()