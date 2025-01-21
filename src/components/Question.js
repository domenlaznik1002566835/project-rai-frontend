import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
    margin-bottom: 30px;
`;

const Subtitle = styled.h2`
    font-size: 18px;
    color: #555;
    margin-bottom: 8px;
`;

const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 12px;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    color: #777;
`;

const RadioInput = styled.input`
    margin-right: 6px;
`;

const Description = styled.span`
    font-size: 14px;
    color: #777;
`;

const Question = ({ question, description, name, value, onChange }) => {
    return (
        <Section>
            <Subtitle>{question}</Subtitle>
            <RadioGroup>
                {[1, 2, 3, 4, 5].map((option) => (
                    <Label key={option}>
                        <RadioInput
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === String(option)}
                            onChange={onChange}
                        />
                        {option}
                    </Label>
                ))}
                <Description>{description}</Description>
            </RadioGroup>
        </Section>
    );
};

export default Question;