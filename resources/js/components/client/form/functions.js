import dayjs from "dayjs";

const hourTreshold = (1 / 24) * 2;


export function getPriceRounded(price) {

    return Math.round((price + Number.EPSILON) * 100) / 100;
}


export function getDaysDifference(from, to) {
    if (from.isSame(to, 'day')) {
        return 1;
    } else {
        var differenceHour = dayjs(to).diff(dayjs(from), 'hours');

        var factor = differenceHour / 24;
        factor = (factor + "").split(".");

        var baseInt = parseInt(factor[0]);
        var baseDecimal = parseFloat("0." + factor[1]).toFixed(5);

        if (baseDecimal > hourTreshold.toFixed(5)) {
            baseInt++;
        }
        else if (baseDecimal == hourTreshold.toFixed(5)) {
            var differenceMin = dayjs(to).diff(dayjs(from), 'minutes');
            if (differenceMin - (differenceHour * 60) > 0) {
                baseInt++;
            }
        }

        return baseInt;
    }

};

export function getPromotions(promotions, start, days, level) {
    var init = dayjs(start);
    var min = undefined;
    var max = undefined;
    var factors = Array(days).fill({ value: 1, priority: 1 });
    var index = 0;
    while (index < factors.length) {

        promotions.map((promotion) => {
            var hasLevel = true;
            if (promotion.levels.length) {
                var record = promotion.levels.find((e) => e.id == level);
                if (!record) {
                    hasLevel = false;
                }
            }

            if (hasLevel) {
                min = dayjs(promotion.start).startOf('day');
                max = dayjs(promotion.end).endOf('day');

                if (init.isBetween(min, max)) {
                    if (factors[index].priority <= promotion.priority) {
                        factors[index] = { value: promotion.factor, priority: promotion.priority };
                    }
                }
            }

        })

        init.add(1, 'days');
        index++;
        if (index > 365) {
            break;
        }
    }
    var response = [];
    factors.map((factor) => {
        response.push(factor.value);
    })

    return response;
}

export function getCarPrice(prices, days, factors) {
    var value = parseInt(prices[2].price);
    prices.map((price) => {
        if (days >= parseInt(price.min) && days <= parseInt(price.max)) {
            value = parseInt(price.price);
        }
    })

    var array = Array(days).fill(value);
    var carPrice = 0;

    // array.map((day, index) => {
    //     carPrice += day * factors[index];
    // });

    array.map((day, index) => {
        carPrice += day;
    });

    return carPrice;
}

export function getInsurancePrice(insurances, days) {
    return parseFloat(insurances.find((e) => { return e.name.pt == "Premium" }).price) * days;

}

export function isDateDisabled(current, blockedDates, currentDates, index, maximumValues, registration = true) {
    if (!registration) {
        return true;
    }

    let isBlocked = blockedDates.includes(current.format("YYYY-MM-DD"));

    if (isBlocked) {
        return true
    } else {
        let tomorrow = dayjs().add(1, 'days').format("YYYY-MM-DD HH:mm");
        if (current && (current.isBefore(tomorrow))) {
            return true
        } else {
            let tooEarly = false;
            let tooLate = false;

            if (currentDates) {
                var condition = false;
                if (index != 0) {
                    condition = currentDates[0];
                }

                tooLate = condition ? current.diff(currentDates[0], 'days') > maximumValues[0] : current.isAfter(maximumValues[1], 'days');
                tooEarly = condition ?
                    dayjs(current).startOf('day').diff(dayjs(currentDates[0]).startOf('day'), 'days') < 0
                    : dayjs(current).startOf('day').diff(dayjs().startOf('day'), 'days') < 1;

                var nextBlockedDate = null;
                if (condition) {
                    for (let index = 0; index < blockedDates.length; index++) {
                        var blockedDate = dayjs(blockedDates[index]);

                        if (blockedDate.isAfter(currentDates[0])) {
                            nextBlockedDate = blockedDate;
                            break;
                        }
                    }
                }


                if (nextBlockedDate) {
                    if (current.isAfter(nextBlockedDate)) {
                        tooLate = true;
                    }
                }

            }

            return !!tooEarly || !!tooLate;
        }
    }

}

