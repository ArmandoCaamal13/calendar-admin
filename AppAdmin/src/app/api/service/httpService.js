
export const fetchCalendar = async (site, domain) => {
    const endpoint = 'cdn/calendar';
    const queryParams = `site=${site}&domain=${domain}`;

    try {
        const response = await fetch(`https://netcore.apicalendar.com/${endpoint}?${queryParams}`);
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error)
        throw error;
    }
}

export const updateCalendar = async (site, domain, updatedSchedules) => {
    const endpoint = 'cdn/calendar';
    const queryParams = `site=${site}&domain=${domain}`;

    try {
        const response = await fetch(`https://netcore.apicalendar.com/${endpoint}?${queryParams}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSchedules)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating data: ', error);
        throw error;
    }
}