import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import html2canvas from 'html2canvas';
import { toPng, toSvg } from 'html-to-image';

function App() {
  const exportStats = async (format) => {
    try {
      const element = document.getElementById('stats-container');
      if (!element) return;

      // Create a temporary container for export
      const exportContainer = document.createElement('div');
      exportContainer.style.position = 'fixed';
      exportContainer.style.left = '-10000px';
      exportContainer.style.top = '0';
      exportContainer.style.width = '500px';
      exportContainer.style.padding = '16px';
      exportContainer.style.backgroundColor = '#1a1e2c';
      exportContainer.style.fontSize = '1rem';
      exportContainer.style.lineHeight = '1.2';
      exportContainer.style.fontFamily = 'Roboto, sans-serif';
      
      // Clone the card and add to export container
      const card = element.querySelector('.MuiCard-root');
      if (!card) throw new Error('Card element not found');
      
      const exportElement = card.cloneNode(true);
      exportContainer.appendChild(exportElement);
      document.body.appendChild(exportContainer);

      // Export the container
      const dataUrl = format === 'svg' 
        ? await toSvg(exportElement)
        : await toPng(exportElement, { 
            backgroundColor: '#1a1e2c',
            pixelRatio: 2
          });
      
      // Create and trigger download
      const link = document.createElement('a');
      link.download = `leetcode-stats-${username}.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      document.body.removeChild(exportContainer);
      
    } catch (error) {
      console.error('Export error:', error);
      setError('Failed to export stats. Please try again.');
    }
  };

  const [username, setUsername] = useState('');
  const [displayUsername, setDisplayUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async (username) => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_PRODUCTION_URL
        : process.env.REACT_APP_API_BASE_URL;
      const apiUrl = `${baseUrl}/${username}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status !== 200 || !data.data?.matchedUser?.profile?.ranking) {
        throw new Error('User not found. Please check the username and try again.');
      }
      
      setUserData(data.data);
      setDisplayUsername(username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadAsImage = async (format = 'png') => {
    const element = document.getElementById('stats-container');
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = `leetcode-stats.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  const generateStats = () => {
    if (!userData) return null;

    const { matchedUser, matchedUserStats, allQuestionsCount } = userData;
    const { submitStats: { acSubmissionNum, totalSubmissionNum } } = matchedUserStats;
    const totalSolved = acSubmissionNum.find(q => q.difficulty === 'All')?.count || 0;
    const totalQuestions = allQuestionsCount.find(q => q.difficulty === 'All')?.count || 0;
    const totalSubmissions = totalSubmissionNum[0]?.submissions || 0;

    return (
      <Box id="stats-container" sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        width: { xs: '100%', sm: 450, md: 500 }, 
        maxWidth: '100%', 
        mx: 'auto',
        boxSizing: 'border-box'
      }}>
        <Card sx={{ mb: 3, p: 2, background: 'rgba(35,43,62,0.97)' }}>
          <Typography variant="h5" sx={{ color: '#00cba4', fontWeight: 700 }} gutterBottom>
            {matchedUser.profile.realName ? `${matchedUser.profile.realName}'s LeetCode Stats` : `${displayUsername}'s LeetCode Stats`}
          </Typography>
          <Divider sx={{ mb: 2, background: '#222c3c' }} />
          <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
            <Grid item xs={8}>
              <Box sx={{ '& > *': { mb: { xs: 1, md: 1.5 } } }}>
                <Typography sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1rem' },
                  flexWrap: 'wrap'
                }}>
                  <LeaderboardIcon sx={{ mr: 1, color: '#ffd600', fontSize: { xs: '1rem', md: '1.25rem' } }} /> 
                  Ranking: <Box component="span" sx={{ color: '#fff', ml: 1 }}>{matchedUser.profile.ranking}</Box>
                </Typography>
                <Typography sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: { xs: '1rem', md: '1rem' },
                  flexWrap: 'wrap'
                }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#00cba4', fontSize: { xs: '1rem', md: '1.25rem' } }} /> 
                  Reputation: <Box component="span" sx={{ ml: 1 }}>{matchedUser.profile.reputation}</Box>
                </Typography>
                <Typography sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: { xs: '1rem', md: '1rem' },
                  flexWrap: 'wrap'
                }}>
                  <AssignmentTurnedInIcon sx={{ mr: 1, color: '#00cba4', fontSize: { xs: '1rem', md: '1.25rem' } }} /> 
                  Total Solved: <Box component="span" sx={{ ml: 1 }}>{totalSolved} / {totalQuestions}</Box>
                </Typography>
                <Typography sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: { xs: '1rem', md: '1rem' },
                  flexWrap: 'wrap'
                }}>
                  <AssignmentIcon sx={{ mr: 1, color: '#00cba4', fontSize: { xs: '1rem', md: '1.25rem' } }} /> 
                  Total Submissions: <Box component="span" sx={{ ml: 1 }}>{totalSubmissions}</Box>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                gap: { xs: 0.75, md: 0.75 },
                '& > *': {
                  width: { xs: 90, md: 90 },
                  p: { xs: 0.5, md: 0.5 },
                  mb: { xs: 1, md: 1 },
                  '& .MuiTypography-root': {
                    fontSize: { xs: 14, md: 14 }
                  }
                }
              }}>
                {['Easy', 'Medium', 'Hard'].map((diff) => {
                  const color = diff === 'Easy' ? '#00cba4' : diff === 'Medium' ? '#ffb300' : '#e53935';
                  const label = diff === 'Medium' ? 'Med.' : diff;
                  const solved = acSubmissionNum.find(q => q.difficulty === diff)?.count || 0;
                  const total = allQuestionsCount.find(q => q.difficulty === diff)?.count || 0;
                  
                  return (
                    <Box key={diff} sx={{ 
                      bgcolor: '#27292c', 
                      borderRadius: 2, 
                      textAlign: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }}>
                      <Typography sx={{ 
                        color, 
                        fontWeight: 600, 
                        mb: 0.25,
                        fontSize: 'inherit'
                      }}>
                        {label}
                      </Typography>
                      <Typography sx={{ 
                        color: '#fff', 
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: 'inherit' }
                      }}>
                        {solved}/{total}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    );
  };


  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        flex: '1 0 auto',
        p: { xs: 2, md: 3 }, 
        maxWidth: 1200, 
        mx: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
      <Typography 
        variant="h3" 
        gutterBottom
        sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}
      >
        LeetCode Stats Viewer
      </Typography>

      <Box sx={{ 
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'flex-start' }
      }}>
        <TextField
          label="LeetCode Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="small"
          fullWidth
          sx={{ 
            flex: { sm: 1 },
            '& .MuiOutlinedInput-root': {
              height: { xs: '40px', sm: 'auto' }
            }
          }}
        />
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchUserData(username)}
            disabled={!username || loading}
            size="large"
            fullWidth
            sx={{ 
              height: '40px',
              '& .MuiButton-startIcon': {
                ml: 0.5
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Show Result'}
          </Button>
          {userData && (
            <Box sx={{ 
              display: 'flex',
              gap: 1,
              width: '100%',
              '& .MuiButton-root': {
                flex: 1,
                minWidth: 'auto',
                height: '40px',
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }
            }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => exportStats('png')}
                startIcon={<SaveAltIcon />}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Export </Box>PNG
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => exportStats('svg')}
                startIcon={<SaveAltIcon />}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Export </Box>SVG
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {userData && generateStats()}
      </Box>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '0.875rem',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          flexShrink: 0
        }}
      >
        <Typography variant="body2">
          Created by{' '}
          <a 
            href="https://tharhtoo.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 500
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Thar Htoo
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
