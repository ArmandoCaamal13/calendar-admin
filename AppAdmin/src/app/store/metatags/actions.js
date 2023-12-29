export const UPDATE_ACCORDION_DATA = 'UPDATE_ACCORDION_DATA';

export const updateAccordionData = (newData) => ({
    type: UPDATE_ACCORDION_DATA,
    payload: {newData}
});