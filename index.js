const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem = "Welcome to my Application!"

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: "Enter the Goal:"})

    if (meta.length == 0) {
        mensagem = "The goal can't be empty!"
        return
    }

    metas.push({
        value: meta,
        checked: false
    })

    mensagem = "Goals successfully inserted"
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "No goals registered"
        return
    }

    const answers = await checkbox({
        message: "Arrows: Change Goal\n Space Bar: Check/Uncheck\n Enter: Finish",
        choices: [...metas],
        instructions: false
    })

    metas.forEach(goal => {
        goal.checked = false
    });

    if(answers.length == 0){
        mensagem = "No goal selected"
        return
    }

    answers.forEach(answer => {
        const meta = metas.find((goal) => {
            return goal.value == answer
        })

        meta.checked = true
    });

    mensagem = "The goals have been updated!"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "No realized goals :("
        return
    }
    
    await select({
        message: "Total Realized Goals - " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        mensagem = "No open goals :)"
        return
    }
    
    await select({
        message: "Total Open Goals - " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const dMetas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const deletar = await checkbox({
        message: "Arrows: Change Goal\n Space Bar: Check/Uncheck\n Enter: Finish",
        choices: [...dMetas],
        instructions: false
    })

    if(deletar.length == 0){
        mensagem = "Nothing to delete"
        return
    }

    deletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })

        mensagem = "Goals successfully deleted"
    })
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != ""){
        console.log(mensagem + "\n");
        mensagem = ""
    }
}

const start = async () => {
    while(true){

        mostrarMensagem()

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Insert Goal",
                    value: "cadastrar"
                },
                {
                    name: "List Goals",
                    value: "listar"
                },
                {
                    name: "Realized Goals >",
                    value: "realizadas"
                },
                {
                    name: "Open Goals >",
                    value: "abertas"
                },
                {
                    name: "Delete Goals",
                    value: "deletar"
                },
                {
                    name: "Exit",
                    value: "sair"
                }
            ]
        })

        switch (option) {
            case "cadastrar":
                await cadastrarMeta()
                break
            
            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break
 
            case "sair":
                console.log("See you later!")
                return
        }
    }
}

start();