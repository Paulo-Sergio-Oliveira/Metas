const { select } = require("@inquirer/prompts")

const start = async () => {
    while(true){

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (option) {
            case "cadastrar":
                console.log("Vamos Cadastrar!")
                break;
            
            case "listar":
                console.log("Vamos Listar!")
                break;

            case "sair":
                console.log("Até mais!")
                return
        }
    }
}

start();