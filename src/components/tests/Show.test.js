import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShow = {
    name: 'Stranger Things',
    summary: 'data about Stranger Things, the series vs the episodes',
    seasons: [
    {id: 0, name: 'Season 1', episodes: []},
    {id: 1, name: 'Season 2', episodes: []},
    {id: 2, name: 'Season 3', episodes: []},
    {id: 3, name: 'Season 4', episodes: []}]
    }

test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"}/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    const loadingMessage = screen.queryByText(/Fetching data.../i);
    expect(loadingMessage).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={"none"} />)
    const seasonNumber = screen.queryAllByTestId("season-option");
    expect(seasonNumber).toHaveLength(4);
});

test('handleSelect is called when a season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const dropDown = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(dropDown, ['1']);
    expect(handleSelect).toBeCalled();

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShow} selectedSeason={"none"}/>);
    let selectedOptions = screen.queryByText(/Select a season/i);
    expect(selectedOptions).toBeInTheDocument();
    rerender(<Show show={testShow} selectedSeason={"1"}/>)
    selectedOptions = screen.queryByText(/Season 2/i);
    expect(selectedOptions).toBeInTheDocument();
});
