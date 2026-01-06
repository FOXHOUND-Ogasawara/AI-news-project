import React from 'react';
import { Drawer, TextField, Box, Typography, Divider, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FeedIcon from '@mui/icons-material/Feed';

const drawerWidth = 280;

interface SidebarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ searchQuery, setSearchQuery }) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffd700' }}>
                    <FeedIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                        AIニュース
                    </Typography>
                </Box>
            </Toolbar>
            <Divider sx={{ borderColor: '#ffd700' }} />
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#ffd700' }}>
                    記事検索
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', bgcolor: 'rgba(255,255,255,0.1)', p: 1, borderRadius: 1 }}>
                    <SearchIcon sx={{ color: '#ffffff', mr: 1, my: 0.5 }} />
                    <TextField
                        id="search-input"
                        variant="standard"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="キーワードを入力"
                        InputProps={{
                            style: { color: '#ffffff' },
                            disableUnderline: true
                        }}
                    />
                </Box>
            </Box>
            <Divider sx={{ borderColor: '#ffd700' }} />
            {/* Additional New Year decoration? */}
            <Box sx={{ p: 2, textAlign: 'center', mt: 'auto', mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Happy New Year 2026
                </Typography>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
