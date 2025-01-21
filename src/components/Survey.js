import React, {useState} from 'react';
import Header from './Header';
import styled from 'styled-components';
import Question from "./Question";
import { ip } from './ip';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    height: 100vh; /* Takes up 100% of viewport */
    background: #e6e3df;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    padding-bottom: 50px;
`;

const ContentContainer = styled.div`
    background: white;
    padding: 32px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 80%; /* 80% of the viewport width */
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 24px;
`;

const SubmitButton = styled.button`
    background: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 16px;
    align-self: center;

    &:hover {
        background: #555;
    }
`;

const ErrorLabel = styled.label`
    display: block;
    color: red;
    font-size: 14px;
    margin-left: 10px;
    text-align: left;
`;

const SubmitContainer = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 16px;
    text-align: center;
`;

const Subtitle = styled.h2`
    color: #555;
    margin-bottom: 8px;
`;

const Text = styled.p`
    color: #777;
    line-height: 1.6;
`;

function Survey(){
    const [error, setError] = useState("");
    const [thankYou, setThankYou] = useState(false);
    const [responses, setResponses] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
        question9: '',
        question10: '',
        question11: '',
        question12: '',
    });

    const [startTime, setStartTime] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (!startTime) {
            setStartTime(Date.now());
        }

        setResponses({ ...responses, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let i in responses) {
            if (responses[i] === '') {
                setError('Please answer all the questions.');
                return;
            }
        }

        const timeTaken = (Date.now() - startTime) / 1000;
        const payload = {
            responses,
            timeTaken
        };

        try {
            const response = await fetch(`${ip}/survey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setThankYou(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                console.error("Failed to submit survey:", response.statusText);
                setError('Failed to submit survey. Please try again.');
            }
        } catch (err) {
            console.error("Error occurred while submitting survey:", err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Container>
            <Header />
            {!thankYou ? (
                <ContentContainer>
                    <Title>Survey</Title>
                    <form onSubmit={handleSubmit}>
                        <Question
                            question="1. How informative did you find the home page in explaining the product?"
                            description={<i>(1 = Not informative, 5 = Very informative)</i>}
                            name="question1"
                            value={responses.question1}
                            onChange={handleChange}
                        />
                        <Question
                            question="2. How helpful is the history page in tracking your locker usage?"
                            description={<i>(1 = Not helpful, 5 = Very helpful)</i>}
                            name="question2"
                            value={responses.question2}
                            onChange={handleChange}
                        />
                        <Question
                            question="3. How easy was it to reserve a parcel locker using the reservations page?"
                            description={<i>(1 = Very difficult, 5 = Very easy)</i>}
                            name="question3"
                            value={responses.question3}
                            onChange={handleChange}
                        />
                        <Question
                            question="4. How straightforward is it to add and manage lockers on the My Locker page?"
                            description={<i>(1 = Very complicated, 5 = Very straightforward)</i>}
                            name="question4"
                            value={responses.question4}
                            onChange={handleChange}
                        />
                        <Question
                            question="5. How would you rate the website overall?"
                            description={<i>(1 = Very bad, 5 = Great)</i>}
                            name="question5"
                            value={responses.question5}
                            onChange={handleChange}
                        />

                        <Question
                            question="6. How easy was it to log in using your details and the face recognition feature?"
                            description={<i>(1 = Very difficult, 5 = Very easy)</i>}
                            name="question6"
                            value={responses.question6}
                            onChange={handleChange}
                        />

                        <Question
                            question="7. How reliable is the face recognition feature during login?"
                            description={<i>(1 = Very unreliable, 5 = Very reliable)</i>}
                            name="question7"
                            value={responses.question7}
                            onChange={handleChange}
                        />

                        <Question
                            question="8. How straightforward was the registration process, including entering your details and recording the video for face recognition?"
                            description={<i>(1 = Very complicated, 5 = Very straightforward)</i>}
                            name="question8"
                            value={responses.question8}
                            onChange={handleChange}
                        />

                        <Question
                            question="9. How accurate was the barcode scanner in detecting the locker number?"
                            description={<i>(1 = Very inaccurate, 5 = Very accurate)</i>}
                            name="question9"
                            value={responses.question9}
                            onChange={handleChange}
                        />

                        <Question
                            question="10. How reliable was the locker unlocking feature?"
                            description={<i>(1 = Very unreliable, 5 = Very reliable)</i>}
                            name="question10"
                            value={responses.question10}
                            onChange={handleChange}
                        />

                        <Question
                            question="11. How easy was it to navigate and understand the history page?"
                            description={<i>(1 = Very difficult, 5 = Very easy)</i>}
                            name="question11"
                            value={responses.question11}
                            onChange={handleChange}
                        />

                        <Question
                            question="12. How would you rate the mobile app overall?"
                            description={<i>(1 = Very bad, 5 = Great)</i>}
                            name="question12"
                            value={responses.question12}
                            onChange={handleChange}
                        />

                        <SubmitContainer>
                            <SubmitButton type="submit">Submit</SubmitButton>
                            {error && <ErrorLabel>{error}</ErrorLabel>}
                        </SubmitContainer>
                    </form>
                </ContentContainer>
            ) : (
                <ContentContainer>
                    <Subtitle>Thank you for your feedback!</Subtitle>
                    <Text>Redirecting to the homepage...</Text>
                </ContentContainer>
            )}
        </Container>
    );
}

export default Survey;