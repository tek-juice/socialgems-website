'use client'
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect, useMemo, useRef } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaVideo, FaPen, FaAlignLeft, FaRegImage, FaMusic, FaUsers, FaCheckSquare, FaPlay, FaEye, FaHeart, FaShare, FaBookmark, FaSpinner } from "react-icons/fa";

interface Story {
  story_id: number;
  title: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  admin_feedback: string;
  tags: string[];
  user_id: number;
  fname: string;
  lname: string;
  email: string;
  user_image?: string;
  text_content?: string;
  image_urls?: string[];
  picture_description?: string;
  audio_url?: string;
  poll_question?: string;
  poll_options?: (string | { text: string; votes: number })[];
  multiple_answers?: boolean;
  trivia_question?: string;
  correct_answer?: string;
  trivia_options?: string[];
  time_limit?: number;
}

interface StoriesByType {
  text: Story[];
  picture: Story[];
  audio: Story[];
  poll: Story[];
  trivia: Story[];
}

export default function BlogPost() {
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesByType, setStoriesByType] = useState<StoriesByType>({
    text: [],
    picture: [],
    audio: [],
    poll: [],
    trivia: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'picture' | 'audio' | 'poll' | 'trivia'>('text');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Poll and Trivia state
  const [pollVotes, setPollVotes] = useState<{ [key: number]: string }>({});
  const [triviaAnswers, setTriviaAnswers] = useState<{ [key: number]: string }>({});
  const [triviaResults, setTriviaResults] = useState<{ [key: number]: { isCorrect: boolean; correctAnswer?: string } }>({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [votingPollId, setVotingPollId] = useState<number | null>(null);
  const [submittingTriviaId, setSubmittingTriviaId] = useState<number | null>(null);

  // Story metrics state
  const [storyViews, setStoryViews] = useState<{ [key: number]: number }>({});
  const [storyLikes, setStoryLikes] = useState<{ [key: number]: number }>({});
  const [storySaves, setStorySaves] = useState<{ [key: number]: number }>({});
  const [storyShares, setStoryShares] = useState<{ [key: number]: number }>({});
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});
  const [userSaves, setUserSaves] = useState<{ [key: number]: boolean }>({});
  const [loadingMetrics, setLoadingMetrics] = useState<{ [key: number]: boolean }>({});
  const [showShareDropdown, setShowShareDropdown] = useState<number | null>(null);

  const shareBtnRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ left: number; top: number } | null>(null);

  // Get current stories based on active tab
  const currentStories = useMemo(() => {
    switch (activeTab) {
      case 'text': return storiesByType.text;
      case 'picture': return storiesByType.picture;
      case 'audio': return storiesByType.audio;
      case 'poll': return storiesByType.poll;
      case 'trivia': return storiesByType.trivia;
      default: return storiesByType.text;
    }
  }, [activeTab, storiesByType]);

  const currentStory = currentStories[currentStoryIndex];

  useEffect(() => {
    fetchApprovedStories();
  }, []);

  useEffect(() => {
    // Reset to first story when tab changes
    setCurrentStoryIndex(0);
  }, [activeTab]);

  // Fetch metrics for stories when they change
  useEffect(() => {
    if (stories.length > 0) {
      fetchStoryMetrics();
    }
  }, [stories]);

  // Record view when current story changes
  useEffect(() => {
    if (currentStory) {
      recordView(currentStory.story_id);
    }
  }, [currentStory]);

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareDropdown && !(event.target as Element).closest('.share-dropdown')) {
        setShowShareDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareDropdown]);

  // Function to fetch metrics for all stories
  const fetchStoryMetrics = async () => {
    if (typeof window === 'undefined') return;
    
    const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
    
    for (const story of stories) {
      try {
        // Fetch views
        const viewsResponse = await fetch(`/api/stories/views?story_id=${story.story_id}`);
        if (viewsResponse.ok) {
          const viewsData = await viewsResponse.json();
          setStoryViews(prev => ({ ...prev, [story.story_id]: viewsData.viewCount }));
        }

        // Fetch likes
        const likesResponse = await fetch(`/api/stories/likes?story_id=${story.story_id}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (likesResponse.ok) {
          const likesData = await likesResponse.json();
          setStoryLikes(prev => ({ ...prev, [story.story_id]: likesData.likeCount }));
          setUserLikes(prev => ({ ...prev, [story.story_id]: likesData.isLiked }));
        }

        // Fetch saves
        const savesResponse = await fetch(`/api/stories/saves?story_id=${story.story_id}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (savesResponse.ok) {
          const savesData = await savesResponse.json();
          setStorySaves(prev => ({ ...prev, [story.story_id]: savesData.saveCount }));
          setUserSaves(prev => ({ ...prev, [story.story_id]: savesData.isSaved }));
        }

        // Fetch shares
        const sharesResponse = await fetch(`/api/stories/shares?story_id=${story.story_id}`);
        if (sharesResponse.ok) {
          const sharesData = await sharesResponse.json();
          setStoryShares(prev => ({ ...prev, [story.story_id]: sharesData.shareCount }));
        }
      } catch (error) {
        console.error('Error fetching metrics for story:', story.story_id, error);
      }
    }
  };

  // Function to record a view
  const recordView = async (storyId: number) => {
    if (typeof window === 'undefined') return;
    
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      const response = await fetch('/api/stories/views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ story_id: storyId })
      });

      if (response.ok) {
        const data = await response.json();
        setStoryViews(prev => ({ ...prev, [storyId]: data.viewCount }));
      }
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  // Function to handle like/unlike
  const handleLike = async (storyId: number) => {
    if (!isUserLoggedIn) {
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return;
    }

    setLoadingMetrics(prev => ({ ...prev, [storyId]: true }));
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      const response = await fetch('/api/stories/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ story_id: storyId })
      });

      if (response.ok) {
        const data = await response.json();
        setStoryLikes(prev => ({ ...prev, [storyId]: data.likeCount }));
        setUserLikes(prev => ({ ...prev, [storyId]: data.isLiked }));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to like story');
      }
    } catch (error) {
      alert('Failed to like story. Please try again.');
    } finally {
      setLoadingMetrics(prev => ({ ...prev, [storyId]: false }));
    }
  };

  // Function to handle save/unsave
  const handleSave = async (storyId: number) => {
    if (!isUserLoggedIn) {
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return;
    }

    setLoadingMetrics(prev => ({ ...prev, [storyId]: true }));
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      const response = await fetch('/api/stories/saves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ story_id: storyId })
      });

      if (response.ok) {
        const data = await response.json();
        setStorySaves(prev => ({ ...prev, [storyId]: data.saveCount }));
        setUserSaves(prev => ({ ...prev, [storyId]: data.isSaved }));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to save story');
      }
    } catch (error) {
      alert('Failed to save story. Please try again.');
    } finally {
      setLoadingMetrics(prev => ({ ...prev, [storyId]: false }));
    }
  };

  // Function to handle share
  const handleShare = async (storyId: number, platform: string) => {
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      const response = await fetch('/api/stories/shares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ story_id: storyId, platform })
      });

      if (response.ok) {
        const data = await response.json();
        setStoryShares(prev => ({ ...prev, [storyId]: data.shareCount }));
        
        // Handle actual sharing based on platform
        if (typeof window !== 'undefined') {
          const storyUrl = `${window.location.origin}/blogpost`;
          const storyTitle = currentStory?.title || 'Check out this story';
          
          let shareUrl = '';
          switch (platform) {
            case 'facebook':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`;
              break;
            case 'twitter':
              shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(storyUrl)}&text=${encodeURIComponent(storyTitle)}`;
              break;
            case 'linkedin':
              shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(storyUrl)}`;
              break;
            case 'whatsapp':
              shareUrl = `https://wa.me/?text=${encodeURIComponent(`${storyTitle} ${storyUrl}`)}`;
              break;
            case 'email':
              shareUrl = `mailto:?subject=${encodeURIComponent(storyTitle)}&body=${encodeURIComponent(`Check out this story: ${storyUrl}`)}`;
              break;
            case 'copy_link':
              try {
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  await navigator.clipboard.writeText(storyUrl);
                  alert('Link copied to clipboard!');
                } else {
                  // Fallback for older browsers
                  const textArea = document.createElement('textarea');
                  textArea.value = storyUrl;
                  document.body.appendChild(textArea);
                  textArea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textArea);
                  alert('Link copied to clipboard!');
                }
              } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = storyUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Link copied to clipboard!');
              }
              setShowShareDropdown(null);
              return;
          }
          
          if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
          }
        }
        setShowShareDropdown(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to share story');
      }
    } catch (error) {
      alert('Failed to share story. Please try again.');
    }
  };

  // Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/verify-token', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setIsUserLoggedIn(true);
            setUserEmail(data.email);
            // Ensure token is in sessionStorage for consistency
            sessionStorage.setItem('userToken', token);
          } else {
            setIsUserLoggedIn(false);
            setUserEmail(null);
            // Clear invalid tokens
            sessionStorage.removeItem('userToken');
            localStorage.removeItem('token');
          }
        } else {
          setIsUserLoggedIn(false);
          setUserEmail(null);
        }
      } catch (error) {
        setIsUserLoggedIn(false);
        setUserEmail(null);
        // Clear tokens on error
        sessionStorage.removeItem('userToken');
        localStorage.removeItem('token');
      }
    };
    
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, []);

  const fetchApprovedStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stories/acceptedStory');
      const data = await response.json();
      
      if (data.success) {
        setStories(data.stories);
        setStoriesByType(data.storiesByType);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch stories');
      }
    } catch (err) {
      setError('Error fetching stories');
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  const getWeeklyStories = (stories: Story[]) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const endOfWeek = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
    const weeklyStories = stories.filter(story => {
      const storyDate = new Date(story.created_at);
      return storyDate >= startOfWeek && storyDate <= endOfWeek;
    });
    return weeklyStories;
  }

  const getStoryIcon = (type: string) => {
    switch (type) {
      case 'story': return <FaAlignLeft className="text-2xl text-gold" />;
      case 'picture_comic': return <FaRegImage className="text-2xl text-gold" />;
      case 'audio': return <FaMusic className="text-2xl text-gold" />;
      case 'poll': return <FaUsers className="text-2xl text-gold" />;
      case 'trivia_quiz': return <FaCheckSquare className="text-2xl text-gold" />;
      default: return <FaAlignLeft className="text-2xl text-gold" />;
    }
  };

  const getStoryTypeLabel = (type: string) => {
    switch (type) {
      case 'story': return 'Text Stories';
      case 'picture_comic': return 'Picture/Comic';
      case 'audio': return 'Audio Stories';
      case 'poll': return 'Polls';
      case 'trivia_quiz': return 'Trivia Quizzes';
      default: return 'Stories';
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'text': return <FaAlignLeft className="text-xl" />;
      case 'picture': return <FaRegImage className="text-xl" />;
      case 'audio': return <FaMusic className="text-xl" />;
      case 'poll': return <FaUsers className="text-xl" />;
      case 'trivia': return <FaCheckSquare className="text-xl" />;
      default: return <FaAlignLeft className="text-xl" />;
    }
  };

  const handlePrevious = () => {
    setCurrentStoryIndex(prev => prev > 0 ? prev - 1 : currentStories.length - 1);
  };

  const handleNext = () => {
    setCurrentStoryIndex(prev => prev < currentStories.length - 1 ? prev + 1 : 0);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setCurrentStoryIndex(0);
  };

  // Poll voting function
  const handlePollVote = async (pollId: number, voteOption: string) => {
    if (!isUserLoggedIn) {
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return;
    }

    setVotingPollId(pollId);
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      if (!token) {
        alert('Please log in to vote');
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
        return;
      }

      const response = await fetch('/api/stories/pollVotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          poll_id: pollId,
          vote_option: voteOption
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setPollVotes(prev => ({ ...prev, [pollId]: voteOption }));
        // Update the story with new vote counts
        setStories(prev => prev.map(story => {
          if (story.story_id === pollId && story.poll_options) {
            return {
              ...story,
              poll_options: data.updatedOptions
            };
          }
          return story;
        }));
        setStoriesByType(prev => ({
          ...prev,
          poll: prev.poll.map(story => {
            if (story.story_id === pollId && story.poll_options) {
              return {
                ...story,
                poll_options: data.updatedOptions
              };
            }
            return story;
          })
        }));
      } else {
        alert(data.error || 'Failed to vote');
      }
    } catch (error) {
      alert('Failed to vote. Please try again.');
    } finally {
      setVotingPollId(null);
    }
  };

  // Trivia answering function
  const handleTriviaAnswer = async (triviaId: number, answer: string) => {
    if (!isUserLoggedIn) {
      if (typeof window !== 'undefined') {
        const currentUrl = window.location.href;
        window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return;
    }

    if (!answer.trim()) {
      alert('Please enter an answer');
      return;
    }

    setSubmittingTriviaId(triviaId);
    try {
      const token = sessionStorage.getItem('userToken') || localStorage.getItem('token');
      if (!token) {
        alert('Please log in to answer trivia');
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
        return;
      }

      const response = await fetch('/api/stories/triviaAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          trivia_quiz_id: triviaId,
          answer: answer.trim()
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setTriviaAnswers(prev => ({ ...prev, [triviaId]: answer }));
        setTriviaResults(prev => ({ 
          ...prev, 
          [triviaId]: { 
            isCorrect: data.isCorrect, 
            correctAnswer: data.correctAnswer 
          } 
        }));
      } else {
        alert(data.error || 'Failed to submit answer');
      }
    } catch (error) {
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmittingTriviaId(null);
    }
  };

  const tabs = [
    { key: 'text', label: 'Text Stories', count: storiesByType.text.length },
    { key: 'picture', label: 'Picture/Comic', count: storiesByType.picture.length },
    { key: 'audio', label: 'Audio Stories', count: storiesByType.audio.length },
    { key: 'poll', label: 'Polls', count: storiesByType.poll.length },
    { key: 'trivia', label: 'Trivia Quizzes', count: storiesByType.trivia.length }
  ];

  // Loading skeleton component
  const StorySkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center text-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold to-brown rounded-b-3xl z-0"></div>
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Community Stories</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Discover amazing content from our community creators
          </p>
          {/* <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stories.length}</div>
              <div className="text-sm opacity-90">Total Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{storiesByType.text.length}</div>
              <div className="text-sm opacity-90">Text Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{storiesByType.picture.length}</div>
              <div className="text-sm opacity-90">Visual Stories</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Story Categories</h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.key
                        ? 'bg-gold text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getTabIcon(tab.key)}
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-sm opacity-75">{tab.count} stories</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats are disbaled for now.*/}
              {/*}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Stories</span>
                    <span className="font-medium text-brown">{stories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">This Week</span>
                    <span className="font-medium text-brown">{getWeeklyStories(stories).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Authors</span>
                    <span className="font-medium text-brown">{new Set(stories.map(s => s.user_id)).size}</span>
                  </div>
                </div>
              </div>*/}

              {/* Call to Action */}
              <div className="mt-6 p-4 bg-gold/10 rounded-lg">
                <h4 className="text-sm font-semibold text-gold mb-2">Share Your Story</h4>
                <p className="text-xs text-gray-600 mb-3">Join our community and share your creative content</p>
                <Link 
                  href="/create-story"
                  className="block w-full text-center bg-gold text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gold/90 transition-colors"
                >
                  Create Story
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {loading && isInitialLoad ? (
              <div className="space-y-8">
                <StorySkeleton />
                <StorySkeleton />
                <StorySkeleton />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <button
                  onClick={fetchApprovedStories}
                  className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : currentStories.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-500 text-xl mb-4">No {getStoryTypeLabel(activeTab === 'text' ? 'story' : activeTab)} found</div>
                <p className="text-gray-400 mb-6">Be the first to share a {activeTab === 'text' ? 'text story' : activeTab}!</p>
                <Link 
                  href="/create-story"
                  className="inline-block bg-gold text-white py-3 px-6 rounded-lg font-medium hover:bg-gold/90 transition-colors"
                >
                  Create Your First Story
                </Link>
              </div>
            ) : currentStory ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Story Card Visual (user image or gradient) */}
                <div className="relative w-full max-h-[400px] h-[400px] flex items-center justify-center bg-white rounded-t-2xl overflow-hidden">
                  {currentStory.user_image ? (
                    <img
                      src={currentStory.user_image}
                      alt={currentStory.fname + ' ' + currentStory.lname}
                      className="max-w-full max-h-full object-contain mx-auto my-auto"
                      style={{ display: 'block' }}
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gold to-brown rounded-t-2xl" />
                  )}
                  {/* Centered story icon if no image */}
                  {!currentStory.user_image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getStoryIcon(currentStory.type)}
                    </div>
                  )}
                </div>
                {/* Story Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentStory.title}</h2>
                  {/* User Profile Section */}
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {currentStory.user_image ? (
                        <Image
                          src={currentStory.user_image}
                          alt={`${currentStory.fname} ${currentStory.lname}`}
                          width={60}
                          height={60}
                          className="rounded-full object-cover border-2 border-gold"
                        />
                      ) : (
                        <div className="w-15 h-15 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gold">
                          <span className="text-gray-600 text-lg font-semibold">
                            {currentStory.fname?.charAt(0)}{currentStory.lname?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          By {currentStory.fname} {currentStory.lname}
                        </h3>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{new Date(currentStory.created_at).toLocaleDateString()}</span>
                      </div>
                      {/* <p className="text-sm text-gray-600 mb-2">{currentStory.email}</p> */}
                      <div className="flex items-center gap-2">
                        {getStoryIcon(currentStory.type)}
                        <span className="text-sm font-medium text-gray-500">
                          {getStoryTypeLabel(currentStory.type === 'text' ? 'story' : currentStory.type)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Story Type Specific Content */}
                  <div className="mb-8">
                    {currentStory.type === 'story' && currentStory.text_content && (
                      <div className="prose max-w-none text-gray-700 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: currentStory.text_content }} />
                      </div>
                    )}
                    
                    {currentStory.type === 'picture_comic' && currentStory.image_urls && currentStory.image_urls.length > 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {currentStory.image_urls.slice(1).map((url, index) => (
                          <Image
                            key={index}
                            src={url}
                            alt={`${currentStory.title} - Image ${index + 2}`}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    {currentStory.type === 'picture_comic' && currentStory.picture_description && (
                      <p className="text-gray-700 leading-relaxed">{currentStory.picture_description}</p>
                    )}
                    
                    {currentStory.type === 'audio' && currentStory.audio_url && (
                      <div className="mb-4">
                        <audio controls className="w-full">
                          <source src={currentStory.audio_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    
                    {currentStory.type === 'poll' && currentStory.poll_question && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">{currentStory.poll_question}</h3>
                        <div className="space-y-3">
                          {currentStory.poll_options?.map((option, index) => {
                            // Handle both string and object formats for poll options
                            let optionText = '';
                            let voteCount = 0;
                            
                            if (typeof option === 'string') {
                              optionText = option;
                            } else if (option && typeof option === 'object' && 'text' in option) {
                              optionText = option.text;
                              voteCount = option.votes || 0;
                            } else {
                              optionText = 'Invalid option';
                            }

                            // Calculate total votes and percentage
                            const totalVotes = currentStory.poll_options?.reduce((sum: number, opt: any) => {
                              if (typeof opt === 'object' && 'votes' in opt) {
                                return sum + (opt.votes || 0);
                              }
                              return sum;
                            }, 0) || 0;
                            
                            const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                            const hasVoted = pollVotes[currentStory.story_id] === optionText;
                            
                            return (
                              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-gray-900">{optionText}</span>
                                  <span className="text-sm text-gray-700">
                                    {voteCount} votes ({percentage}%)
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                  <div 
                                    className="bg-gold h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                {!pollVotes[currentStory.story_id] && isUserLoggedIn && (
                                  <button
                                    onClick={() => handlePollVote(currentStory.story_id, optionText)}
                                    disabled={votingPollId === currentStory.story_id}
                                    className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                                      votingPollId === currentStory.story_id
                                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                        : 'bg-gold text-white hover:bg-gold/90'
                                    }`}
                                  >
                                    {votingPollId === currentStory.story_id ? (
                                      <>
                                        <FaSpinner className="animate-spin" />
                                        Voting...
                                      </>
                                    ) : (
                                      'Vote'
                                    )}
                                  </button>
                                )}
                                {hasVoted && (
                                  <div className="text-center text-green-600 text-sm font-medium">
                                    ✓ Your vote
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {!isUserLoggedIn && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800 text-sm">
                              Please <button 
                                onClick={() => {
                                  const currentUrl = window.location.href;
                                  window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
                                }} 
                                className="text-blue-600 underline font-medium"
                              >
                                sign in
                              </button> to vote on this poll.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {currentStory.type === 'trivia_quiz' && currentStory.trivia_question && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">{currentStory.trivia_question}</h3>
                        <div className="space-y-3 mb-4">
                          {currentStory.trivia_options?.map((option, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <span className="text-gray-900">{option}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Answer Input Section */}
                        {!triviaResults[currentStory.story_id] && (
                          <div className="mb-4">
                            <label className="block text-gray-900 mb-2 font-medium">Your Answer:</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={triviaAnswers[currentStory.story_id] || ''}
                                onChange={(e) => setTriviaAnswers(prev => ({ 
                                  ...prev, 
                                  [currentStory.story_id]: e.target.value 
                                }))}
                                placeholder="Type your answer here..."
                                className="flex-1 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                              />
                              <button
                                onClick={() => handleTriviaAnswer(currentStory.story_id, triviaAnswers[currentStory.story_id] || '')}
                                disabled={submittingTriviaId === currentStory.story_id}
                                className={`bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors font-medium flex items-center gap-2 ${
                                  submittingTriviaId === currentStory.story_id
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : ''
                                }`}
                              >
                                {submittingTriviaId === currentStory.story_id ? (
                                  <>
                                    <FaSpinner className="animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  'Submit'
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Result Section */}
                        {triviaResults[currentStory.story_id] && (
                          <div className={`p-4 rounded-lg border ${
                            triviaResults[currentStory.story_id].isCorrect 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-red-50 border-red-200'
                          }`}>
                            {triviaResults[currentStory.story_id].isCorrect ? (
                              <div className="text-green-800">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xl">🎉</span>
                                  <span className="font-semibold">Correct!</span>
                                </div>
                                <p>Great job! You got it right.</p>
                                <div className="mt-3 p-3 bg-green-100 rounded-lg">
                                  <p className="text-sm font-medium text-green-800">
                                    Correct Answer: {currentStory.correct_answer}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-red-800">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xl">❌</span>
                                  <span className="font-semibold">Incorrect</span>
                                </div>
                                <p>Your answer: "{triviaAnswers[currentStory.story_id]}"</p>
                                <div className="mt-3 p-3 bg-red-100 rounded-lg">
                                  <p className="text-sm font-medium text-red-800">
                                    Correct Answer: {currentStory.correct_answer}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Sign in prompt for non-logged in users */}
                        {!isUserLoggedIn && !triviaResults[currentStory.story_id] && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-800 text-sm">
                              Please <button 
                                onClick={() => {
                                  const currentUrl = window.location.href;
                                  window.location.href = `/sign-in?redirect=${encodeURIComponent(currentUrl)}`;
                                }} 
                                className="text-blue-600 underline font-medium"
                              >
                                sign in
                              </button> to answer this trivia question.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {currentStory.tags && currentStory.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentStory.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    {/* Views */}
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaEye />
                      <span className="text-sm">{storyViews[currentStory.story_id] || 0}</span>
                    </div>
                    
                    {/* Like Button */}
                    <button 
                      onClick={() => handleLike(currentStory.story_id)}
                      disabled={loadingMetrics[currentStory.story_id]}
                      className={`flex items-center gap-2 transition-colors ${
                        userLikes[currentStory.story_id] 
                          ? 'text-red-500' 
                          : 'text-gray-500 hover:text-red-500'
                      } ${loadingMetrics[currentStory.story_id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loadingMetrics[currentStory.story_id] ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaHeart />
                      )}
                      <span className="text-sm">{storyLikes[currentStory.story_id] || 0}</span>
                    </button>
                    
                    {/* Share Button with Dropdown */}
                    <div className="relative share-dropdown">
                      <button
                        ref={shareBtnRef}
                        onClick={e => {
                          if (showShareDropdown === currentStory.story_id) {
                            setShowShareDropdown(null);
                            setDropdownPos(null);
                          } else {
                            setShowShareDropdown(currentStory.story_id);
                            const rect = shareBtnRef.current?.getBoundingClientRect();
                            if (rect) {
                              setDropdownPos({
                                left: rect.left + rect.width / 2,
                                top: rect.top,
                              });
                            }
                          }
                        }}
                        disabled={loadingMetrics[currentStory.story_id]}
                        className={`flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors ${
                          loadingMetrics[currentStory.story_id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {loadingMetrics[currentStory.story_id] ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaShare />
                        )}
                        <span className="text-sm">{storyShares[currentStory.story_id] || 0}</span>
                      </button>
                      
                      {/* Share Dropdown - fixed position above button */}
                      {showShareDropdown === currentStory.story_id && dropdownPos && (
                        <div
                          className="fixed z-50 min-w-48 bg-white border border-gray-300 rounded-lg shadow-xl animate-fadein"
                          style={{
                            left: dropdownPos.left - 120, // 120px = half of min-w-48 (240px)
                            top: dropdownPos.top - 16 - 8 - 240, // 16px button height, 8px margin, 240px dropdown height
                            width: 240,
                          }}
                        >
                          <div className="flex justify-center" style={{ position: 'relative', top: 232 }}>
                            <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #e5e7eb' }}></div>
                          </div>
                          <div className="p-2">
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'facebook')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                              <span className="text-blue-600 text-lg">📘</span> Facebook
                            </button>
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'twitter')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded flex items-center gap-2 text-gray-700 hover:text-blue-400 transition-colors"
                            >
                              <span className="text-blue-400 text-lg">🐦</span> Twitter
                            </button>
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'linkedin')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 rounded flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors"
                            >
                              <span className="text-blue-700 text-lg">💼</span> LinkedIn
                            </button>
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'whatsapp')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 rounded flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                            >
                              <span className="text-green-500 text-lg">📱</span> WhatsApp
                            </button>
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'email')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2 text-gray-700 hover:text-gray-800 transition-colors"
                            >
                              <span className="text-gray-600 text-lg">📧</span> Email
                            </button>
                            <button
                              onClick={() => handleShare(currentStory.story_id, 'copy_link')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2 text-gray-700 hover:text-gray-800 transition-colors"
                            >
                              <span className="text-gray-600 text-lg">🔗</span> Copy Link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Save Button */}
                    <button 
                      onClick={() => handleSave(currentStory.story_id)}
                      disabled={loadingMetrics[currentStory.story_id]}
                      className={`flex items-center gap-2 transition-colors ${
                        userSaves[currentStory.story_id] 
                          ? 'text-gold' 
                          : 'text-gray-500 hover:text-gold'
                      } ${loadingMetrics[currentStory.story_id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loadingMetrics[currentStory.story_id] ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaBookmark />
                      )}
                      <span className="text-sm">{storySaves[currentStory.story_id] || 0}</span>
                    </button>
                  </div>
                </div>
                {/* Navigation Arrows - moved below story details */}
                <div className="flex justify-center items-center gap-8 pb-8">
                  <button
                    onClick={handlePrevious}
                    className="bg-brown text-white hover:bg-black transition-colors rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg"
                    aria-label="Previous Story"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-brown font-semibold text-lg">{currentStoryIndex + 1} of {currentStories.length}</span>
                  <button
                    onClick={handleNext}
                    className="bg-brown text-white hover:bg-black transition-colors rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg"
                    aria-label="Next Story"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}