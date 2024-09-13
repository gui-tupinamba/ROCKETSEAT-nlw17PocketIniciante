const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
    value: 'beber agua',
    checked: false,
};

let metas = [ meta ];

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: "});

    if(meta.length == 0) {
        console.log("Você não digitou nenhuma meta.");
        return; 
    };

    metas.push(
        { value: meta, checked: false } 
    );
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as SETAS para mudar de meta, ESPAÇO para marcar ou desmarcar e o ENTER para finalizar essa etapa.",
        choices: [...metas],
        instructions: false,
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if(respostas.length == 0) {
        console.log("Você não escolheu nenhuma meta.");
        return;
    };

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });

        meta.checked = true;
    });

    console.log('Meta(s) concluída(as)')

};

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });
    
    if (realizadas.length == 0) {
        console.log("Você não realizou nenhuma meta.");
        return;
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas],
    })
}

const start = async () => {
    while(true) {
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar",
                },
                {
                    name: "Listar metas",
                    value: "listar",
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas",
                },
                {
                    name: "Sair",
                    value: "sair",
                },
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizadas":
                await metasRealizadas();
                break;
            case "sair":
                console.log("Saindo do programa...");
                return;
        };
    };
};
start();