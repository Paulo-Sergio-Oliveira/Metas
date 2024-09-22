const { select, input } = require("@inquirer/prompts")

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a Meta:"})

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia!")
        return
    }
    metas.push({
        value: meta,
        checked: false
    })
}

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
                await cadastrarMeta()
                break;
            
            case "listar":
                console.log("Vamos listar!");
                break;

            case "sair":
                console.log("Até mais!")
                return
        }
    }
}

start();