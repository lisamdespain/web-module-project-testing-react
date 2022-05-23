import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    id: 1234, 
    image: 'https://i.ibb.co/2FsfXqM/stranger-things.png', 
    name: 'Stranger Things', 
    season: 1, 
    number: 1, 
    summary: 'Summary info goes here', 
    runtime: 56 
}
const altTestEpisode = {
    id: 1234, 
    image: null, 
    name: 'Stranger Things', 
    season: 1, 
    number: 1, 
    summary: 'Summary info goes here', 
    runtime: 56 
}
test("renders without error", () => { 
    render(<Episode episode={testEpisode}/>)
});

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={testEpisode}/>);
    const summaryText = screen.queryByText(/summary info goes here/i);
    expect(summaryText).toBeInTheDocument();
    expect(summaryText).toBeVisible();
    expect(summaryText).toBeTruthy();
});

test("renders default image when image is not defined", () => { 
    render(<Episode episode={altTestEpisode}/>)
    const defaultPic = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(defaultPic).toBeInTheDocument();
});
