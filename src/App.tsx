import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QuestionsList, QuestionWithAnswers } from './components';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/questions" />} />
                <Route path="/questions" element={<QuestionsList></QuestionsList>} />
                <Route path="/question/:id" element={<QuestionWithAnswers></QuestionWithAnswers>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
