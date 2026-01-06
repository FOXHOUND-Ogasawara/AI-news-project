import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import React from 'react';
import type { NewsItem } from '../services/rssService';

interface NewsCardProps {
    item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
    // Simple date formatting
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'scale(1.02) translateY(-5px)',
                boxShadow: '0 10px 20px rgba(183, 28, 28, 0.2)', // Red glow
                borderColor: '#b71c1c'
            }
        }}>
            <CardActionArea href={item.link} target="_blank" rel="noopener noreferrer" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="caption" sx={{ color: '#b71c1c', fontWeight: 'bold' }}>
                        {formatDate(item.pubDate)} - {item.source}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.6
                    }}>
                        {item.description}
                    </Typography>
                </CardContent>
                {/* Decorative gold line at bottom instead of button */}
                <div style={{ height: '4px', background: '#ffd700', width: '100%', marginTop: 'auto' }}></div>
            </CardActionArea>
        </Card>
    );
};

export default NewsCard;
