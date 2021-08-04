import { Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';

function BigSearchComponent({ populateDeadData }) {
    const [summoner, setSummoner] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const summonerName = event.target[0].value;
        if (summonerName === summoner) return;
        populateDeadData(summonerName);
        setSummoner(summonerName);
    }

    return (
        // d-flex enables flexbox so that button is next to the input field
        <Form className='d-flex main-form' onSubmit={handleFormSubmit}>
            <FormControl
                placeholder="Search summoner"
                name='input'
            />
            <Button type='submit' variant="outline-success">Search</Button>
        </Form>
    )
}

export default BigSearchComponent;