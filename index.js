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

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "Use as SETAS para mudar de meta, ESPAÇO para marcar ou desmarcar e o ENTER para finalizar essa etapa.",
        choices: [...metas],
    });

    if(respostas.length == 0) {
        console.log("Você não escolheu nenhuma meta.");
        return;
    };

    metas.forEach((m) => {
        m.checked = false;
    });

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });

        meta.checked = true;
    });

    console.log('Meta(s) concluída(as)')

};

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
                await listarMeta();
                break;
            case "sair":
                console.log("Saindo do programa...");
                return;
        };
    };
};
start();