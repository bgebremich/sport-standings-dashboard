

let standingsData =[];


async function fetchStandings (leagueId = 'PL') {
    const errorDiv = document.getElementById('error-message');
    const tableBody = document.getElementById('table-body');
    errorDiv.classList.add('hidden');
    tableBody.innerHTML = '<tr><td colspan="8">Loading data...</td></tr>';
    try {
        
        const response = await fetch (`/api/standings?league=${leagueId}`);
        if (!response.ok) { 
            throw new Error ('API returned an error');
        }
        const data = await response.json();
                if (data.standings && data.standings[0].table.length > 0) {
            standingsData = data.standings[0].table;
            renderTable (standingsData);
        } else {
            throw new Error ('No data found');
        }
    } catch (error) { 
        console.error(error);
        errorDiv.textContent = 'No standings data available for this league right now.';
        errorDiv.classList.remove('hidden');
        tableBody.innerHTML = '';
    }
}
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML= '';
    data.forEach(team => {
        const row=document.createElement('tr');
        
              row.innerHTML = `
        <td>${team.position}</td>
        <td class="team-name">
        <img src="${team.team.crest}" alt="badge" style="height: 20px; margin-right :8px;">
            ${team.team.name}
            </td>
            <td>${team.playedGames}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td>${team.goalDifference}</td>
            <td><strong>${team.points}</strong></td>
            `; 
                    tableBody.appendChild(row);
    });
}
function sortTable(column) {
    const isAscending = document.getElementById('standings-table').getAttribute('data-sort-asc') === 'true';
    const direction = isAscending ? 1 : -1;

    standingsData.sort((a, b) => {
       

        const fields = { points: 'points', played: 'playedGames', win: 'won', draw: 'draw', loss: 'lost', gd: 'goalDifference' };
        const valA = a[fields[column]];
        const valB = b[fields[column]];
                if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0;
    });
    

    document.getElementById('standings-table').setAttribute('data-sort-asc', !isAscending);
    renderTable(standingsData);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStandings();

    const leagueSelect = document.getElementById('league-select');
    leagueSelect.addEventListener('change', (e) => {
        fetchStandings(e.target.value);
    });

    const headers = document.querySelectorAll('th.sortable');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            sortTable(sortKey);
        });
    });
    
});
