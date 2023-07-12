export const text = {
    titles: ["Reservation details", "Insurance", "Addons", "Client information", "Driver information", "Additional Driver", "Payment method"],
    extras: {
        "Cobertura SCDW": "SCDW cover",
        "Cobertura vidros e pneus": "Windows and tyres coverage",
        "Condutor adicional": "Additional driver",
        "Cadeira de bébé": "Baby seat",
        "Assento de criança": "Child seat"
    },
    descriptions: {
        manual: "manual",
        automatic: "automatic",
        gasoline: "gasoline",
        hybrid: "hybrid",
        eletric: "eletric",
        diesel: "diesel"
    },
    prices: {
        per: "per",
        day: "day",
        uni: "uni"
    },
    insurance: {
        button: "selected",
        basic: {
            title: "Basic",
            items: ["CDW (Collision Damage Waiver) protection", "Subject to a excess / security deposit"]
        },
        premium: {
            title: "Premium",
            items: ["Premium coverage - SCDW (Super Collision Damage Waiver)", "Possible damages are covered", "No credit card required"]
        }
    },
    placeholder: {
        date: ["Pickup time", "Drop off time"],
        client: {
            name: "Name*",
            cc: "ID/Passport*",
            country: "Country*",
            email: "Email*",
            phone: "Phone number*",
        },
        driver: {
            name: "Name*",
            birthday: "Birth date*",
            license: "License number*",
        },
    },
    button: "book",
    notice: "My address",
    error: "The following errors during the reservation",
    payments: [
        {
            id: 1,
            name: "Credit card",
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
            name: "Pay at pickup",
            image: "/icon/money.svg"
        }
    ]
} 
