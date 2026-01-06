import {
    Alert,
    Box,
    CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    ThemeProvider,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import TweetCard from "./components/TweetCard";
import { fetchNews, type NewsItem } from "./services/rssService";
import SendIcon from '@mui/icons-material/Send';

const drawerWidth = 280;

// New Year Theme (Oshogatsu)
const theme = createTheme({
    palette: {
        mode: "light", // Switch to light mode for the white/red aesthetic
        primary: {
            main: "#b71c1c", // Deep Red (Kouhaku - Red)
        },
        secondary: {
            main: "#ffd700", // Gold
        },
        background: {
            default: "#fffaf0", // Floral White (Washi paper feel)
            paper: "#ffffff",
        },
        text: {
            primary: "#3e2723", // Dark Brown/Black for softer contrast
        },
    },
    typography: {
        fontFamily: '"Shippori Mincho", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
        h4: {
            fontWeight: 700,
            letterSpacing: "0.05em",
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: `
            linear-gradient(45deg, #fdfbf7 25%, transparent 25%, transparent 75%, #fdfbf7 75%, #fdfbf7),
            linear-gradient(45deg, #fdfbf7 25%, transparent 25%, transparent 75%, #fdfbf7 75%, #fdfbf7)
          `,
                    backgroundPosition: '0 0, 20px 20px',
                    backgroundSize: '40px 40px',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: "1px solid #ffd700", // Gold border
                    background: "#ffffff",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#b71c1c", // Red Sidebar
                    color: "#ffffff",
                    borderRight: "4px solid #ffd700", // Gold border line
                },
            },
        },
    },
});

function App() {
    const [searchQuery, setSearchQuery] = useState("Artificial Intelligence");
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // X Posting State
    const [latestNews, setLatestNews] = useState<NewsItem | null>(null);
    const [posting, setPosting] = useState(false);
    const [postResult, setPostResult] = useState<{ success: boolean, message: string } | null>(null);

    useEffect(() => {
        const getNews = async () => {
            setLoading(true);
            setError(null);
            setLatestNews(null);
            try {
                const data = await fetchNews(searchQuery);
                setNews(data);
                if (data.length === 0) {
                    setError(
                        "ニュースが見つかりませんでした。別のキーワードで試してください。"
                    );
                } else {
                    // Find latest news based on pubDate
                    const sorted = [...data].sort((a, b) => {
                        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
                    });
                    setLatestNews(sorted[0]);
                }
            } catch {
                setError("ニュースの取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                getNews();
            }
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handlePostToX = async () => {
        if (!latestNews) return;
        setPosting(true);
        setPostResult(null);
        try {
            const response = await fetch('/api/tweet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: latestNews.title,
                    date: new Date(latestNews.pubDate).toLocaleDateString('ja-JP'),
                    url: latestNews.link
                })
            });

            const result = await response.json();

            if (response.ok) {
                setPostResult({ success: true, message: 'Xへの投稿が完了しました！' });
            } else {
                throw new Error(result.error || 'Failed to post');
            }
        } catch (err: any) {
            setPostResult({ success: false, message: `投稿失敗: ${err.message}` });
        } finally {
            setPosting(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        minHeight: "100vh",
                    }}
                >
                    <Toolbar />

                    <Container maxWidth="xl">
                        <Typography
                            variant="h4"
                            gutterBottom
                            component="div"
                            sx={{
                                mb: 4,
                                color: "#b71c1c",
                                textShadow: "1px 1px 0px #ffd700",
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            🎍 {searchQuery} ニュース 🎍
                        </Typography>

                        {postResult && (
                            <Alert severity={postResult.success ? "success" : "error"} sx={{ mb: 3 }} onClose={() => setPostResult(null)}>
                                {postResult.message}
                            </Alert>
                        )}

                        {latestNews && !loading && (
                            <Box sx={{ mb: 6, p: 3, border: '2px dashed #b71c1c', borderRadius: 4, bgcolor: 'rgba(255,255,255,0.8)' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    🚀 最新ニュース自動投稿 (プレビュー)
                                </Typography>
                                <Grid container spacing={4} alignItems="center">
                                    <Grid item xs={12} md={7}>
                                        <TweetCard
                                            title={latestNews.title}
                                            date={new Date(latestNews.pubDate).toLocaleDateString()}
                                            url={latestNews.link}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={posting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                            onClick={handlePostToX}
                                            disabled={posting || (postResult?.success ?? false)}
                                            sx={{
                                                borderRadius: 30,
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem',
                                                bgcolor: '#000000', // X black
                                                '&:hover': { bgcolor: '#333333' }
                                            }}
                                        >
                                            {posting ? '投稿中...' : 'Xに投稿する'}
                                        </Button>
                                        <Typography variant="caption" display="block" sx={{ mt: 1, color: '#666' }}>
                                            ※クリックすると即座に投稿されます
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                                <CircularProgress color="secondary" />
                            </Box>
                        )}

                        {error && !loading && (
                            <Alert severity="warning" sx={{ borderRadius: 2 }}>{error}</Alert>
                        )}

                        {!loading && !error && (
                            <Grid container spacing={3}>
                                {news.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <NewsCard item={item} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
