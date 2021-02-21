fetch('https://api.covid19api.com/summary', {
        "method": 'GET',
        "mode": "cors",
        "headers": {
            "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
            "X-Access-host": "api.covid19api.com/summary"
        }
    })
    .then(response => response.json())
    .then(json => displayGlobalData(json.Global))

const displayGlobalData = global => {
    const globalContainer = document.getElementById('global-statistics');
    const globalDiv = document.createElement('div');
    globalDiv.innerHTML = `
        <h3>Global Statistic:</h3>
        <br>
        <p>New Confirmed: ${global.NewConfirmed}
            <br> New Deaths: ${global.NewDeaths}
            <br> New Recovered: ${global.NewRecovered}
            <br>
            <br> Total Confirmed: ${global.TotalConfirmed}
            <br> Total Deaths: ${global.TotalDeaths}
            <br> Total Recovered: ${global.TotalRecovered}
            <br>
        </p>
        `;
    globalContainer.appendChild(globalDiv);
    const date = document.getElementById('date')
    date.innerText = `Date: ${global.Date.slice(0,10)}`
}

const searchCountry = () => {
    document.getElementById("country-statistics").innerText = '';
    fetch('https://api.covid19api.com/summary', {
            "method": 'GET',
            "mode": "cors",
            "headers": {
                "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
                "X-Access-host": "api.covid19api.com/summary"
            }
        })
        .then(response => response.json())
        .then(json => displayCountryData(json.Countries))
}

const displayCountryData = countries => {
    for (let i = 0; i < countries.length; i++) {
        const countryName = countries[i].Country;
        const countryName2 = countries[i].Slug;
        let inputText = document.getElementById('search-field').value;

        if (countryName === inputText || countryName2 === inputText) {
            const countryContainer = document.getElementById('country-statistics');
            const countryDiv = document.createElement('div');
            countryDiv.innerHTML = `
                <h3>${countries[i].Country}'s Statistic:</h3>
                <br>
                <p>Total Confirmed: ${countries[i].TotalConfirmed}
                    <br> Total Deaths: ${countries[i].TotalDeaths}
                    <br> Total Recovered: ${countries[i].TotalRecovered}
                    <br>
                </p>
                `;
            countryContainer.appendChild(countryDiv);
            document.getElementById('country-statistics').style.display = 'block';
            document.getElementById("search-field").value = "";
        }
    }
}

document.getElementById("search-field").addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        document.getElementById("search-button").click();
    }
});