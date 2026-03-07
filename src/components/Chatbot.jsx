import React, { useState } from 'react';
import { Box, IconButton, TextField, Paper, Typography, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const hardcodedResponses = {
    hi: "Hello! I am your Employee Assistant.",
    hello: "Hi there! How can I help you today?",
    help: "You can ask things like 'list employees', 'show admins', or just say hi.",
    "list employees": "Currently, we have 10 employees in the system.",
    "show admins": "Admins: Alice, Bob, Charlie",
    bye: "Goodbye! Have a nice day!"
};

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input) return;

        // Add user message
        setMessages([...messages, { text: input, sender: 'user' }]);

        // Get hardcoded response
        const key = input.toLowerCase();
        const botResponse = hardcodedResponses[key] || "Sorry, I don't understand that.";

        // Add bot response after a short delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 300);

        setInput('');
    };

    return (
        <>
            {open && (
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: 80,
                        right: 20,
                        width: 300,
                        height: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 1000,
                        padding: 1
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">Chatbot</Typography>
                        <IconButton size="small" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages */}
                    <Box sx={{ flex: 1, overflowY: 'auto', mb: 1, px: 1 }}>
                        {messages.map((msg, i) => (
                            <Box
                                key={i}
                                sx={{ textAlign: msg.sender === 'user' ? 'right' : 'left', mb: 1 }}
                            >
                                <Paper
                                    sx={{
                                        display: 'inline-block',
                                        p: 1,
                                        bgcolor: msg.sender === 'user' ? '#3f51b5' : '#f1f1f1',
                                        color: msg.sender === 'user' ? 'white' : 'black',
                                        borderRadius: 1
                                    }}
                                >
                                    {msg.text} {/* Only plain text */}
                                </Paper>
                            </Box>
                        ))}
                    </Box>

                    {/* Input */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <IconButton color="primary" onClick={handleSend}>
                            <ChatIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}

            {/* Floating Button */}
            {!open && (
                <Fab
                    color="primary"
                    onClick={() => setOpen(true)}
                    sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
                >
                    <ChatIcon />
                </Fab>
            )}
        </>
    );
}

export default Chatbot;