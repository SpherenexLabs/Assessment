import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import './StudentDashboard.css';

// Firebase configuration from your image
const firebaseConfig = {
  apiKey: "AIzaSyDMxqQPyVZy9v2yVZy9v2yVZy9v2yVZy9v",
  authDomain: "v2v-communication-d46c6-default-rtdb.firebaseio.com",
  databaseURL: "https://v2v-communication-d46c6-default-rtdb.firebaseio.com",
  projectId: "v2v-communication-d46c6",
  storageBucket: "v2v-communication-d46c6.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Hardcoded assessment questions - Microprocessor based
const assessmentQuestions = [
  {
    id: 1,
    question: "What is the word size of 8086 microprocessor?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 2,
    question: "Which register is used as stack pointer in 8086?",
    options: ["AX", "BX", "SP", "BP"],
    correctAnswer: 2,
    marks: 5
  },
  {
    id: 3,
    question: "How many flags are there in 8086 microprocessor?",
    options: ["6", "9", "12", "16"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 4,
    question: "What is the purpose of the Accumulator register?",
    options: [
      "Store memory addresses",
      "Store arithmetic and logical operation results",
      "Store program counter",
      "Store status flags"
    ],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 5,
    question: "Which instruction is used to move data from source to destination?",
    options: ["ADD", "MOV", "SUB", "JMP"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 6,
    question: "What does ALU stand for?",
    options: [
      "Arithmetic Logic Unit",
      "Array Logic Unit",
      "Advanced Logic Unit",
      "Accumulator Logic Unit"
    ],
    correctAnswer: 0,
    marks: 5
  },
  {
    id: 7,
    question: "Which addressing mode uses direct memory address?",
    options: ["Immediate", "Direct", "Register", "Indirect"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 8,
    question: "What is the size of the instruction queue in 8086?",
    options: ["4 bytes", "6 bytes", "8 bytes", "16 bytes"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 9,
    question: "Which flag is set when the result of an operation is zero?",
    options: ["Carry Flag", "Zero Flag", "Sign Flag", "Overflow Flag"],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 10,
    question: "What is the maximum memory addressable by 8086?",
    options: ["64 KB", "256 KB", "1 MB", "4 MB"],
    correctAnswer: 2,
    marks: 5
  },
  {
    id: 11,
    question: "Which instruction is used to compare two operands?",
    options: ["CMP", "TEST", "SUB", "AND"],
    correctAnswer: 0,
    marks: 5
  },
  {
    id: 12,
    question: "What does the instruction 'PUSH AX' do?",
    options: [
      "Pops value from stack to AX",
      "Pushes AX value onto the stack",
      "Moves AX to memory",
      "Clears AX register"
    ],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 13,
    question: "Which segment register holds the base address of the code segment?",
    options: ["DS", "ES", "CS", "SS"],
    correctAnswer: 2,
    marks: 5
  },
  {
    id: 14,
    question: "What is the function of the Instruction Pointer (IP)?",
    options: [
      "Store data",
      "Point to the next instruction to be executed",
      "Store flags",
      "Manage interrupts"
    ],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 15,
    question: "Which instruction is used for unconditional jump?",
    options: ["JZ", "JNZ", "JMP", "LOOP"],
    correctAnswer: 2,
    marks: 5
  },
  {
    id: 16,
    question: "CODING: Write 8086 code to add two numbers 15H and 25H. What is the correct code?",
    options: [
      "MOV AL, 15H\nMOV BL, 25H\nADD AL, BL\nHLT",
      "ADD 15H, 25H\nHLT",
      "MOV AL, 15H+25H\nHLT",
      "LOAD AL, 40H"
    ],
    correctAnswer: 0,
    marks: 5
  },
  {
    id: 17,
    question: "CODING: Write code to subtract 10 from 50 and store result in CL:",
    options: [
      "MOV CL, 50\nSUB CL, 10\nHLT",
      "SUB 50, 10\nMOV CL, AL",
      "MOV AL, 50-10\nMOV CL, AL",
      "SUBTRACT CL, 50, 10"
    ],
    correctAnswer: 0,
    marks: 5
  },
  {
    id: 18,
    question: "CODING: Write code to multiply AL by 2 using shift operation:",
    options: [
      "MUL AL, 2",
      "SHL AL, 1\nHLT",
      "SHR AL, 1\nHLT",
      "ADD AL, AL\nHLT"
    ],
    correctAnswer: 1,
    marks: 5
  },
  {
    id: 19,
    question: "CODING: Write a loop to count from 1 to 5. Select the correct code:",
    options: [
      "MOV CX, 5\nLOOP1: DEC CX\nJNZ LOOP1\nHLT",
      "MOV CX, 5\nLOOP1: INC CX\nLOOP LOOP1\nHLT",
      "FOR CX = 1 TO 5",
      "COUNT 1 TO 5"
    ],
    correctAnswer: 0,
    marks: 5
  },
  {
    id: 20,
    question: "CODING: Write code to check if number in AL is greater than 50. Which is correct?",
    options: [
      "CMP AL, 50\nJG GREATER\nHLT\nGREATER: MOV BL, 1\nHLT",
      "IF AL > 50 THEN BL=1",
      "TEST AL, 50",
      "SUB AL, 50\nJZ EQUAL"
    ],
    correctAnswer: 0,
    marks: 5
  }
];

const StudentDashboard = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard', 'assessment', 'results'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Registration form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Login form states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Assessment states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [codingAnswers, setCodingAnswers] = useState({}); // For manual code input
  const [questionStatus, setQuestionStatus] = useState({}); // Track correct/wrong status
  const [questionMarks, setQuestionMarks] = useState({}); // Track marks per question
  const [tabViolations, setTabViolations] = useState(0); // Track tab switch violations
  
  // Message states
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Show message helper
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  // Detect tab switch violations
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Only track if assessment is in progress and not completed
      if (currentView === 'assessment' && assessmentStarted && !assessmentCompleted) {
        if (document.hidden) {
          // User switched away from tab
          const newViolations = tabViolations + 1;
          setTabViolations(newViolations);
          
          if (newViolations === 1) {
            showMessage('⚠️ Warning: Do not switch tabs during assessment! Next violation will auto-submit.', 'error');
          } else if (newViolations >= 2) {
            showMessage('🚫 Assessment auto-submitted due to tab switching violation!', 'error');
            // Mark as completed and auto-submit
            setAssessmentCompleted(true);
            // Auto-submit after a short delay
            setTimeout(() => {
              submitAssessment(true);
            }, 1500);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentView, assessmentStarted, assessmentCompleted, tabViolations]);

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!regName || !regEmail || !regPhone || !regPassword) {
      showMessage('Please fill all fields', 'error');
      return;
    }

    if (regPhone.length < 10) {
      showMessage('Please enter a valid phone number', 'error');
      return;
    }

    try {
      // Check if phone already exists
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `students/${regPhone}`));
      
      if (snapshot.exists()) {
        showMessage('Phone number already registered', 'error');
        return;
      }

      // Save to Firebase
      await set(ref(database, 'students/' + regPhone), {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        registeredAt: new Date().toISOString(),
        assessments: []
      });

      showMessage('Registration successful! Please login.', 'success');
      
      // Clear form and switch to login
      setRegName('');
      setRegEmail('');
      setRegPhone('');
      setRegPassword('');
      
      setTimeout(() => {
        setCurrentView('login');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      showMessage('Registration failed. Please try again.', 'error');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginPhone || !loginPassword) {
      showMessage('Please enter phone number and password', 'error');
      return;
    }

    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `students/${loginPhone}`));
      
      if (!snapshot.exists()) {
        showMessage('Phone number not registered', 'error');
        return;
      }

      const userData = snapshot.val();
      
      if (userData.password !== loginPassword) {
        showMessage('Incorrect password', 'error');
        return;
      }

      // Login successful
      setCurrentUser({
        phone: loginPhone,
        ...userData
      });
      
      setCurrentView('dashboard');
      showMessage(`Welcome back, ${userData.name}!`, 'success');
      
      // Clear login form
      setLoginPhone('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);
      showMessage('Login failed. Please try again.', 'error');
    }
  };

  // Start Assessment
  const startAssessment = async () => {
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setCodingAnswers({});
    setQuestionStatus({});
    setQuestionMarks({});
    setAssessmentCompleted(false);
    setTabViolations(0);
    setCurrentView('assessment');

    // Initialize Firebase with default values
    if (currentUser) {
      try {
        await set(ref(database, 'Assessment/Ans'), 0);
        await set(ref(database, 'Assessment/Marks'), 0);
        await set(ref(database, 'Assessment/Total'), 0);
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    }
  };

  // Evaluate and update Firebase for multiple choice questions
  const handleAnswerSelect = async (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });

    // Find the question
    const question = assessmentQuestions.find(q => q.id === questionId);
    if (!question) return;

    // Check if answer is correct
    const isCorrect = answerIndex === question.correctAnswer;
    const answerStatus = isCorrect ? 1 : 2;
    const marksEarned = isCorrect ? 2 : 0; // Multiple choice = 2 marks

    // Update local state
    setQuestionStatus(prev => ({ ...prev, [questionId]: answerStatus }));
    setQuestionMarks(prev => ({ ...prev, [questionId]: marksEarned }));

    // Update Firebase immediately
    if (currentUser) {
      try {
        await set(ref(database, 'Assessment/Ans'), answerStatus);
        await set(ref(database, 'Assessment/Marks'), marksEarned);
        
        // Calculate and update total
        const newQuestionMarks = { ...questionMarks, [questionId]: marksEarned };
        const total = Object.values(newQuestionMarks).reduce((sum, marks) => sum + marks, 0);
        await set(ref(database, 'Assessment/Total'), total);

        // If wrong answer (status 2), reset to 0 after 5 seconds
        if (answerStatus === 2) {
          setTimeout(async () => {
            await set(ref(database, 'Assessment/Ans'), 0);
          }, 5000);
        }
      } catch (error) {
        console.error('Error updating Firebase:', error);
      }
    }
  };

  // Handle Coding Answer Input (just store the code)
  const handleCodingAnswer = (questionId, code) => {
    setCodingAnswers({
      ...codingAnswers,
      [questionId]: code
    });
  };

  // Submit and evaluate coding answer
  const submitCodingAnswer = async (questionId) => {
    const code = codingAnswers[questionId] || '';
    
    // Don't evaluate empty code
    if (!code.trim()) {
      showMessage('Please write some code before submitting', 'error');
      return;
    }

    // Find the question
    const question = assessmentQuestions.find(q => q.id === questionId);
    if (!question) return;

    // Evaluate coding answer
    const correctCode = question.options[question.correctAnswer];
    const normalizedUserCode = code.toUpperCase().replace(/\s+/g, ' ').trim();
    const normalizedCorrectCode = correctCode.toUpperCase().replace(/\s+/g, ' ').trim();
    
    const isCorrect = normalizedUserCode.includes(normalizedCorrectCode.substring(0, 20)) || 
                      normalizedCorrectCode.includes(normalizedUserCode.substring(0, 20));
    
    const answerStatus = isCorrect ? 1 : 2;
    const marksEarned = isCorrect ? 5 : 0; // Coding = 5 marks

    // Update local state
    setQuestionStatus(prev => ({ ...prev, [questionId]: answerStatus }));
    setQuestionMarks(prev => ({ ...prev, [questionId]: marksEarned }));

    // Update Firebase immediately
    if (currentUser) {
      try {
        await set(ref(database, 'Assessment/Ans'), answerStatus);
        await set(ref(database, 'Assessment/Marks'), marksEarned);
        
        // Calculate and update total
        const newQuestionMarks = { ...questionMarks, [questionId]: marksEarned };
        const total = Object.values(newQuestionMarks).reduce((sum, marks) => sum + marks, 0);
        await set(ref(database, 'Assessment/Total'), total);
        
        showMessage('Code submitted successfully!', 'success');

        // If wrong answer (status 2), reset to 0 after 5 seconds
        if (answerStatus === 2) {
          setTimeout(async () => {
            await set(ref(database, 'Assessment/Ans'), 0);
          }, 5000);
        }
      } catch (error) {
        console.error('Error updating Firebase:', error);
        showMessage('Error submitting answer', 'error');
      }
    }
  };

  // Navigate Questionser Input with evaluation
  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit Assessment
  const submitAssessment = async (isViolationSubmit = false) => {
    // Check if all questions are answered (skip validation for violation auto-submit)
    if (!isViolationSubmit) {
      const codingQuestions = assessmentQuestions.filter(q => q.question.startsWith('CODING:'));
      const nonCodingQuestions = assessmentQuestions.filter(q => !q.question.startsWith('CODING:'));
      
      if (Object.keys(answers).length < nonCodingQuestions.length) {
        showMessage('Please answer all multiple choice questions', 'error');
        return;
      }

      // Check if all coding questions are submitted (not just written)
      const submittedCodingQuestions = codingQuestions.filter(q => questionStatus[q.id] !== undefined);
      if (submittedCodingQuestions.length < codingQuestions.length) {
        showMessage('Please submit all coding questions using the Submit Code button', 'error');
        return;
      }
    }

    // Calculate score from questionMarks state
    const calculatedScore = Object.values(questionMarks).reduce((sum, marks) => sum + marks, 0);
    const total = assessmentQuestions.reduce((sum, q) => sum + q.marks, 0);

    setScore(calculatedScore);
    setTotalMarks(total);
    setAssessmentCompleted(true);

    // Save assessment result to Firebase
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `students/${currentUser.phone}`));
      const userData = snapshot.val();
      
      const assessmentResult = {
        date: new Date().toISOString(),
        score: calculatedScore,
        totalMarks: total,
        answers: answers,
        codingAnswers: codingAnswers
      };

      const updatedAssessments = userData.assessments || [];
      updatedAssessments.push(assessmentResult);

      await set(ref(database, `students/${currentUser.phone}/assessments`), updatedAssessments);
      
      showMessage('Assessment submitted successfully!', 'success');
      setCurrentView('results');
    } catch (error) {
      console.error('Error saving assessment:', error);
      showMessage('Assessment completed but failed to save results', 'error');
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setAssessmentStarted(false);
    setAssessmentCompleted(false);
    setAnswers({});
    setCurrentQuestion(0);
    showMessage('Logged out successfully', 'success');
  };

  // Render Registration Form
  const renderRegister = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Student Registration</h1>
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              type="text"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-phone">Phone Number</label>
            <input
              id="reg-phone"
              type="tel"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              placeholder="Enter 10-digit phone number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="Create a password"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => setCurrentView('login')} className="auth-link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );

  // Render Login Form
  const renderLogin = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Student Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-phone">Phone Number</label>
            <input
              id="login-phone"
              type="tel"
              value={loginPhone}
              onChange={(e) => setLoginPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={() => setCurrentView('register')} className="auth-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );

  // Render Dashboard
  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.name}!</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="info-card">
          <h2>Student Information</h2>
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{currentUser?.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{currentUser?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{currentUser?.phone}</span>
          </div>
        </div>

        <div className="assessment-card">
          <h2>Assessment Center</h2>
          <p className="assessment-description">
            Take the assessment to test your knowledge. The assessment contains {assessmentQuestions.length} questions
            with a total of {assessmentQuestions.reduce((sum, q) => sum + q.marks, 0)} marks.
          </p>
          <button onClick={startAssessment} className="btn-start-assessment">
            Start Assessment
          </button>
        </div>

        {currentUser?.assessments && currentUser.assessments.length > 0 && (
          <div className="history-card">
            <h2>Assessment History</h2>
            <div className="history-list">
              {currentUser.assessments.map((assessment, index) => (
                <div key={index} className="history-item">
                  <span className="history-date">
                    {new Date(assessment.date).toLocaleDateString()}
                  </span>
                  <span className="history-score">
                    Score: {assessment.score}/{assessment.totalMarks}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render Assessment
  const renderAssessment = () => {
    const question = assessmentQuestions[currentQuestion];
    const isCodingQuestion = question.question.startsWith('CODING:');

    return (
      <div className="assessment-container">
        <div className="assessment-header">
          <h1>Assessment in Progress</h1>
          <div className="assessment-progress">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </div>
          {tabViolations > 0 && (
            <div className="violation-warning">
              ⚠️ Tab Switch Violations: {tabViolations}/2
            </div>
          )}
        </div>

        <div className="question-card">
          <div className="question-header">
            <h2>Question {question.id}</h2>
            <span className="question-marks">{question.marks} marks</span>
          </div>

          <p className="question-text">{question.question}</p>

          {isCodingQuestion ? (
            <div className="coding-section">
              <label className="coding-label">Write your assembly code below:</label>
              <textarea
                className="coding-textarea"
                placeholder="Example:&#10;MOV AL, 5&#10;ADD AL, 3&#10;HLT"
                value={codingAnswers[question.id] || ''}
                onChange={(e) => handleCodingAnswer(question.id, e.target.value)}
                rows="10"
                disabled={questionStatus[question.id] !== undefined}
              />
              <div className="coding-hint">
                <strong>Hint:</strong> Use proper 8086 assembly syntax. Each instruction on a new line.
              </div>
              <div className="coding-submit-section">
                <button
                  onClick={() => submitCodingAnswer(question.id)}
                  className="btn-submit-code"
                  disabled={questionStatus[question.id] !== undefined}
                >
                  {questionStatus[question.id] === undefined ? 'Submit Code' : '✓ Submitted'}
                </button>
              </div>
            </div>
          ) : (
            <div className="options-list">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-item ${answers[question.id] === index ? 'selected' : ''} ${answers[question.id] !== undefined ? 'disabled' : ''}`}
                  onClick={() => answers[question.id] === undefined && handleAnswerSelect(question.id, index)}
                  style={{ cursor: answers[question.id] !== undefined ? 'not-allowed' : 'pointer' }}
                >
                  <div className="option-radio">
                    {answers[question.id] === index && <div className="option-radio-checked" />}
                  </div>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="assessment-navigation">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="btn-nav"
          >
            Previous
          </button>

          <div className="question-indicators">
            {assessmentQuestions.map((q, index) => {
              const isCoding = q.question.startsWith('CODING:');
              const isAnswered = isCoding 
                ? codingAnswers[q.id] !== undefined && codingAnswers[q.id].trim() !== ''
                : answers[q.id] !== undefined;
              
              return (
                <div
                  key={q.id}
                  className={`question-indicator ${
                    isAnswered ? 'answered' : ''
                  } ${index === currentQuestion ? 'current' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                  title={isCoding ? 'Coding Question' : 'Multiple Choice'}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          {currentQuestion < assessmentQuestions.length - 1 ? (
            <button onClick={nextQuestion} className="btn-nav">
              Next
            </button>
          ) : (
            <button onClick={submitAssessment} className="btn-submit">
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render Results
  const renderResults = () => {
    const percentage = ((score / totalMarks) * 100).toFixed(2);
    const passed = percentage >= 50;

    // Calculate detailed statistics based on actual assessment data
    const codingQuestions = assessmentQuestions.filter(q => q.question.startsWith('CODING:'));
    const multipleChoiceQuestions = assessmentQuestions.filter(q => !q.question.startsWith('CODING:'));
    
    // Count correct answers based on questionStatus (1 = correct, 2 = wrong)
    const correctMultipleChoice = multipleChoiceQuestions.filter(q => questionStatus[q.id] === 1).length;
    const correctCoding = codingQuestions.filter(q => questionStatus[q.id] === 1).length;
    
    // Count answered questions
    const answeredMultipleChoice = multipleChoiceQuestions.filter(q => questionStatus[q.id] !== undefined).length;
    const answeredCoding = codingQuestions.filter(q => questionStatus[q.id] !== undefined).length;

    // Calculate marks earned per category
    const multipleChoiceMarks = multipleChoiceQuestions.reduce((sum, q) => sum + (questionMarks[q.id] || 0), 0);
    const codingMarks = codingQuestions.reduce((sum, q) => sum + (questionMarks[q.id] || 0), 0);
    
    // Calculate maximum possible marks per category
    const maxMultipleChoiceMarks = multipleChoiceQuestions.reduce((sum, q) => sum + q.marks, 0);
    const maxCodingMarks = codingQuestions.reduce((sum, q) => sum + q.marks, 0);

    const multipleChoicePercentage = answeredMultipleChoice > 0 
      ? ((multipleChoiceMarks / maxMultipleChoiceMarks) * 100).toFixed(1) 
      : 0;
    const codingPercentage = answeredCoding > 0 
      ? ((codingMarks / maxCodingMarks) * 100).toFixed(1) 
      : 0;

    const totalCorrect = correctMultipleChoice + correctCoding;
    const totalAnswered = answeredMultipleChoice + answeredCoding;
    const totalWrong = totalAnswered - totalCorrect;
    const unanswered = assessmentQuestions.length - totalAnswered;

    return (
      <div className="results-container">
        <div className="results-card">
          <div className={`results-header ${passed ? 'passed' : 'failed'}`}>
            <div className="results-icon">
              {passed ? '🎉' : '📚'}
            </div>
            <h1>{passed ? 'Congratulations!' : 'Keep Trying!'}</h1>
          </div>

          <div className="results-content">
            <div className="score-display">
              <div className="score-circle">
                <span className="score-value">{score}</span>
                <span className="score-total">/ {totalMarks}</span>
              </div>
              <p className="score-percentage">{percentage}%</p>
              <p className="score-grade">{passed ? 'PASS' : 'FAIL'}</p>
            </div>

            {/* Progress Analysis Section */}
            <div className="progress-analysis">
              <h3>📊 Progress Analysis</h3>
              
              <div className="analysis-grid">
                <div className="analysis-card">
                  <div className="analysis-icon">✅</div>
                  <div className="analysis-value">{totalCorrect}</div>
                  <div className="analysis-label">Correct Answers</div>
                </div>
                
                <div className="analysis-card">
                  <div className="analysis-icon">❌</div>
                  <div className="analysis-value">{totalWrong}</div>
                  <div className="analysis-label">Wrong Answers</div>
                </div>
                
                <div className="analysis-card">
                  <div className="analysis-icon">📝</div>
                  <div className="analysis-value">{score}</div>
                  <div className="analysis-label">Marks Earned</div>
                </div>
                
                <div className="analysis-card">
                  <div className="analysis-icon">🎯</div>
                  <div className="analysis-value">{percentage}%</div>
                  <div className="analysis-label">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Category-wise Performance */}
            <div className="category-performance">
              <h3>📈 Category-wise Performance</h3>
              
              <div className="category-item">
                <div className="category-header">
                  <span className="category-name">Multiple Choice Questions</span>
                  <span className="category-score">{correctMultipleChoice}/{answeredMultipleChoice} • {multipleChoiceMarks}/{maxMultipleChoiceMarks} marks</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${multipleChoicePercentage}%` }}>
                    <span className="progress-text">{multipleChoicePercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="category-item">
                <div className="category-header">
                  <span className="category-name">Coding Questions</span>
                  <span className="category-score">{correctCoding}/{answeredCoding} • {codingMarks}/{maxCodingMarks} marks</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar coding" style={{ width: `${codingPercentage}%` }}>
                    <span className="progress-text">{codingPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Performance Graph */}
            <div className="performance-graph">
              <h3>📉 Performance Distribution</h3>
              <div className="graph-container">
                <div className="graph-bar-group">
                  <div className="graph-bar correct" style={{ height: `${totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0}%` }}>
                    <span className="graph-value">{totalCorrect}</span>
                  </div>
                  <span className="graph-label">Correct</span>
                </div>
                <div className="graph-bar-group">
                  <div className="graph-bar wrong" style={{ height: `${totalAnswered > 0 ? (totalWrong / totalAnswered) * 100 : 0}%` }}>
                    <span className="graph-value">{totalWrong}</span>
                  </div>
                  <span className="graph-label">Wrong</span>
                </div>
                {unanswered > 0 && (
                  <div className="graph-bar-group">
                    <div className="graph-bar unanswered" style={{ height: `${totalAnswered > 0 ? (unanswered / assessmentQuestions.length) * 100 : 100}%` }}>
                      <span className="graph-value">{unanswered}</span>
                    </div>
                    <span className="graph-label">Unanswered</span>
                  </div>
                )}
              </div>
            </div>

            <div className="results-summary">
              <h3>Assessment Summary</h3>
              <div className="summary-row">
                <span>Total Questions:</span>
                <span>{assessmentQuestions.length}</span>
              </div>
              <div className="summary-row">
                <span>Correct Answers:</span>
                <span>{totalCorrect}</span>
              </div>
              <div className="summary-row">
                <span>Wrong Answers:</span>
                <span>{totalWrong}</span>
              </div>
              <div className="summary-row">
                <span>Total Marks:</span>
                <span>{totalMarks}</span>
              </div>
              <div className="summary-row">
                <span>Marks Obtained:</span>
                <span>{score}</span>
              </div>
              {unanswered > 0 && (
                <div className="summary-row">
                  <span>Unanswered Questions:</span>
                  <span>{unanswered}</span>
                </div>
              )}
            </div>
{/* 
            <div className="results-details">
              <h3>Answer Review</h3>
              {assessmentQuestions.map((question) => {
                const isCodingQuestion = question.question.startsWith('CODING:');
                let isCorrect = false;
                
                if (isCodingQuestion) {
                  const userCode = codingAnswers[question.id] || '';
                  const correctCode = question.options[question.correctAnswer];
                  const normalizedUserCode = userCode.toUpperCase().replace(/\s+/g, ' ').trim();
                  const normalizedCorrectCode = correctCode.toUpperCase().replace(/\s+/g, ' ').trim();
                  isCorrect = normalizedUserCode.includes(normalizedCorrectCode.substring(0, 20)) || 
                              normalizedCorrectCode.includes(normalizedUserCode.substring(0, 20));
                } else {
                  isCorrect = answers[question.id] === question.correctAnswer;
                }
                
                return (
                  <div key={question.id} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-question">
                      <span className="review-number">Q{question.id}:</span>
                      <span>{question.question}</span>
                    </div>
                    {isCodingQuestion ? (
                      <div className="review-code">
                        <div className="review-code-section">
                          <span className="review-label">Your code:</span>
                          <pre className="code-block">{codingAnswers[question.id] || 'No answer provided'}</pre>
                        </div>
                        {!isCorrect && (
                          <div className="review-code-section">
                            <span className="review-label correct-label">Expected code:</span>
                            <pre className="code-block correct-code">{question.options[question.correctAnswer]}</pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="review-answer">
                        <span className="review-label">Your answer:</span>
                        <span>{question.options[answers[question.id]]}</span>
                        {!isCorrect && (
                          <>
                            <span className="review-label correct-label">Correct answer:</span>
                            <span>{question.options[question.correctAnswer]}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div> */}
          </div>

          <div className="results-actions">
            <button onClick={() => setCurrentView('dashboard')} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="student-dashboard">
      {message && (
        <div className={`message-toast ${messageType}`}>
          {message}
        </div>
      )}

      {currentView === 'login' && renderLogin()}
      {currentView === 'register' && renderRegister()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'assessment' && renderAssessment()}
      {currentView === 'results' && renderResults()}
    </div>
  );
};

export default StudentDashboard;
