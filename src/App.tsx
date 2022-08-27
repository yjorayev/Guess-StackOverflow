import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QuestionContainer, QuestionsList } from './components';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/questions" />} />
                <Route path="/questions" element={<QuestionsList></QuestionsList>} />
                <Route path="/question/:question_id" element={<QuestionContainer></QuestionContainer>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
