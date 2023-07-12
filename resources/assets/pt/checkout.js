export const text = {
    titles: ["Dados da sua reserva", "Seguro", "Extras", "Informação do cliente", "Informação do condutor", "Condutor Adicional", "Método de pagamento"],
    extras: {
        "Cobertura SCDW": "Cobertura SCDW",
        "Cobertura vidros e pneus": "Cobertura vidros e pneus",
        "Condutor adicional": "Condutor adicional",
        "Cadeira de bébé": "Cadeira de bébé",
        "Assento de criança": "Assento de criança"
    },
    prices: {
        per: "por",
        day: "dia",
        uni: "uni"
    },
    descriptions: {
        manual: "manual",
        automatic: "automático",
        gasoline: "gasolina",
        hybrid: "híbrido",
        eletric: "elétrico",
        diesel: "diesel"
    },
    insurance: {
        button: "selecionado",
        basic: {
            title: "Básico",
            items: ["Cobertura CDW (Collision Damage Waiver)", "Sujeito a franquia / depósito de segurança"]
        },
        premium: {
            title: "Premium",
            items: ["Cobertura Premium - SCDW (Super Collision Damage Waiver)", "Possíveis danos estão cobertos", "Não é necessário cartão de crédito"]
        }
    },
    placeholder: {
        date: ["Horário levantamento", "Horário devolução"],
        pickup_place: {
            label: "local levantamento",
            options: ["Aeroporto", "Loja"],
            tax: "Fora",
            placeholder: "Indique outra morada ou hotel"
        },
        return_place: {
            label: "local devolução",
            options: ["Aeroporto", "Loja"],
            tax: "Fora",
            placeholder: "Indique outra morada ou hotel"
        },
        flight: "número de voo",
        client: {
            name: "Nome*",
            cc: "ID/Passaporte*",
            country: "País*",
            email: "Email*",
            phone: "Número de telemóvel*",
        },
        driver: {
            name: "Nome*",
            birthday: "Data de nascimento*",
            license: "Número carta de condução*",
        },
    },
    button: "reservar",
    notice: "A minha morada",
    error: "Ocorreu os seguintes erros com a reserva",
    payments: [
        {
            id: 1,
            name: "Cartão de crédito",
            image: "/icon/credit_card.svg"
        },
        {
            id: 2,
            name: "Paypal",
            image: "/icon/money.svg"
        },
        {
            id: 3,
            name: "Apple Pay",
            image: "/icon/money.svg"
        },
        {
            id: 4,
            name: "Pagar no levantamento",
            image: "/icon/money.svg"
        }
    ]
} 
