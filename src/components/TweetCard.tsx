import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

interface TweetCardProps {
    title: string;
    date: string;
    url: string;
    isPosted?: boolean; // Style difference for already posted vs preview
}

const TweetCard: React.FC<TweetCardProps> = ({ title, date, url, isPosted = false }) => {
    return (
        <Card sx={{
            maxWidth: 600,
            width: '100%',
            mb: 2,
            borderRadius: 4,
            border: '1px solid #e1e8ed',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#f5f8fa' }
        }}>
            <CardContent sx={{ display: 'flex', pb: '16px !important' }}>
                <Avatar src="/broken-image.jpg" sx={{ bgcolor: '#000000', width: 48, height: 48, mr: 2 }}>AI</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1, color: '#0f1419' }}>
                            AI News Bot
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#536471' }}>
                            @ainews_bot · now
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#0f1419', mb: 1, whiteSpace: 'pre-wrap' }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#536471', mb: 1 }}>
                        {date}
                    </Typography>
                    <Card sx={{
                        borderRadius: 4,
                        border: '1px solid #cfd9de',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ bgcolor: '#f7f9f9', p: 1.5 }}>
                            <Typography variant="caption" sx={{ color: '#536471', display: 'block' }}>
                                news.google.com
                            </Typography>
                            <Typography variant="body2" noWrap sx={{ color: '#0f1419' }}>
                                {url}
                            </Typography>
                        </Box>
                    </Card>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TweetCard;
