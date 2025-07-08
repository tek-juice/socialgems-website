//this page shows the full options to create a story.
'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ProtectedRoute from '../components/protected_route/page';
import { FaAlignLeft, FaRegImage, FaMusic, FaUsers, FaCheckSquare, FaTimes, FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaLink, FaSpinner, FaComments, FaEye, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import useSWR from 'swr';

const storyOptions = [
  {
    key: 'story',
    title: 'Story',
    description: 'Share your written story, thoughts, opinion piece, article, essay....',
    icon: <FaAlignLeft className="text-4xl text-brown mb-3" />,
    fields: [
      { label: 'Title', name: 'title', type: 'text', required: true },
      { label: 'Description', name: 'description', type: 'textarea', required: false },
    ],
  },
  {
    key: 'picture',
    title: 'Picture/Comic Story',
    description: 'Share your Picture/Comic Story',
    icon: <FaRegImage className="text-4xl text-brown mb-3" />,
    fields: [
      { label: 'Title', name: 'title', type: 'text', required: true },
      { label: 'Image', name: 'image', type: 'file', required: true },
      { label: 'Description', name: 'description', type: 'textarea', required: false },
    ],
  },
  {
    key: 'audio',
    title: 'Audio Story',
    description: 'Upload your Podcast or other Audio Story (MP3, M4A, OGG, WAV formats). Maximum file size: 2MB.',
    icon: <FaMusic className="text-4xl text-brown mb-3" />,
    fields: [
      { label: 'Title', name: 'title', type: 'text', required: true },
      { label: 'Audio File', name: 'audio', type: 'file', required: true },
      { label: 'Description', name: 'description', type: 'textarea', required: false },
    ],
  },
  {
    key: 'poll',
    title: 'Poll',
    description: 'One or multiple questions about a subject or person',
    icon: <FaUsers className="text-4xl text-brown mb-3" />,
    fields: [
      { label: 'Poll Question', name: 'question', type: 'text', required: true },
      { label: 'Option 1', name: 'option1', type: 'text', required: true },
      { label: 'Option 2', name: 'option2', type: 'text', required: true },
      { label: 'Option 3', name: 'option3', type: 'text', required: false },
      { label: 'Option 4', name: 'option4', type: 'text', required: false },
    ],
  },
  {
    key: 'quiz',
    title: 'Trivia quiz',
    description: 'What do you know about ...?',
    icon: <FaCheckSquare className="text-4xl text-brown mb-3" />,
    fields: [
      { label: 'Quiz Question', name: 'question', type: 'text', required: true },
      { label: 'Correct Answer', name: 'correct', type: 'text', required: true },
      { label: 'Option 1', name: 'option1', type: 'text', required: true },
      { label: 'Option 2', name: 'option2', type: 'text', required: true },
      { label: 'Option 3', name: 'option3', type: 'text', required: false },
    ],
  },
];

const availableTags = [
  'Influencer Marketing',
  'Social Media Tips',
  'Content Creation',
  'Brand Collaboration',
  'Success Stories',
  'Digital Marketing',
  'Social Gems Platform',
  'Industry Insights',
  'Creator Economy',
  'Marketing Strategy',
];

interface FeedbackStory {
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
  content?: string;
  image_urls?: string[];
  description?: string;
  audio_url?: string;
  question?: string;
  options?: any;
  multiple_answers?: boolean;
  correct_answer?: string;
  time_limit?: number;
}

const fetcher = (url: string) => {
  if (typeof window === 'undefined') return Promise.resolve(null);
  return fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
  }).then(res => res.json());
};

export default function CreateStoryPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({ tags: [], images: [], audio: null });
  const [submitted, setSubmitted] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [imageError, setImageError] = useState('');
  const [audioError, setAudioError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [editingStory, setEditingStory] = useState<FeedbackStory | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // SWR for feedbackStories
  const { data: feedbackData, error: feedbackError, mutate: mutateFeedback } = useSWR(
    typeof window !== 'undefined' && localStorage.getItem('token') ? '/api/stories/getFeedback' : null,
    fetcher,
    { refreshInterval: 10000 } // Poll every 10s for live updates
  );
  const feedbackStories = feedbackData?.stories || [];
  const loadingFeedback = !feedbackData && !feedbackError;

  // Initialize the editor only once
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Link],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData((prev: any) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  const getStoryTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return <FaAlignLeft className="text-lg text-brown" />;
      case 'picture_comic': return <FaRegImage className="text-lg text-brown" />;
      case 'audio': return <FaMusic className="text-lg text-brown" />;
      case 'poll': return <FaUsers className="text-lg text-brown" />;
      case 'trivia_quiz': return <FaCheckSquare className="text-lg text-brown" />;
      default: return <FaAlignLeft className="text-lg text-brown" />;
    }
  };

  const getStoryTypeLabel = (type: string) => {
    switch (type) {
      case 'story': return 'Text Story';
      case 'picture_comic': return 'Picture/Comic';
      case 'audio': return 'Audio Story';
      case 'poll': return 'Poll';
      case 'trivia_quiz': return 'Trivia Quiz';
      default: return 'Story';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <FaCheckCircle className="text-green-500" />;
      case 'rejected': return <FaTimesCircle className="text-red-500" />;
      case 'draft': return <FaExclamationTriangle className="text-yellow-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'draft': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleEditStory = async (story: FeedbackStory) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/stories/getStory?id=${story.story_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEditingStory(data.story);
        setIsEditMode(true);
        
        // Set form data based on story type
        const storyData = data.story;
        let formDataToSet: any = {
          title: storyData.title,
          tags: storyData.tags || []
        };

        switch (storyData.type) {
          case 'story':
            formDataToSet.description = storyData.content;
            break;
          case 'picture_comic':
            formDataToSet.description = storyData.description;
            break;
          case 'audio':
            formDataToSet.description = storyData.description;
            break;
          case 'poll':
            formDataToSet.question = storyData.question;
            if (storyData.options && Array.isArray(storyData.options)) {
              storyData.options.forEach((option: any, index: number) => {
                if (option.text) {
                  formDataToSet[`option${index + 1}`] = option.text;
                }
              });
            }
            break;
          case 'trivia_quiz':
            formDataToSet.question = storyData.question;
            formDataToSet.correct = storyData.correct_answer;
            if (storyData.options && Array.isArray(storyData.options)) {
              storyData.options.forEach((option: string, index: number) => {
                formDataToSet[`option${index + 1}`] = option;
              });
            }
            break;
        }

        setFormData(formDataToSet);
        setTagInput('');
        if (editor && storyData.type === 'story') {
          editor.commands.setContent(storyData.content || '');
        }
        
        // Open the appropriate modal
        setOpenModal(storyData.type === 'picture_comic' ? 'picture' : storyData.type);
      }
    } catch (error) {
      console.error('Error fetching story for editing:', error);
      alert('Failed to load story for editing');
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('storyId', editingStory.story_id.toString());
    submitData.append('storyType', editingStory.type);
    submitData.append('title', formData.title);

    // Add type-specific data
    switch (editingStory.type) {
      case 'story':
        if (formData.description) {
          submitData.append('description', formData.description);
        }
        break;
      case 'picture_comic':
        if (formData.description) {
          submitData.append('description', formData.description);
        }
        // Handle image files if new ones are selected
        if (formData.images && formData.images.length > 0) {
          formData.images.forEach((image: File) => {
            submitData.append('image', image);
          });
        }
        break;
      case 'audio':
        if (formData.description) {
          submitData.append('description', formData.description);
        }
        // Handle audio file if new one is selected
        if (formData.audio) {
          submitData.append('audio', formData.audio);
        }
        break;
      case 'poll':
        submitData.append('question', formData.question);
        submitData.append('option1', formData.option1);
        submitData.append('option2', formData.option2);
        if (formData.option3) {
          submitData.append('option3', formData.option3);
        }
        if (formData.option4) {
          submitData.append('option4', formData.option4);
        }
        break;
      case 'trivia_quiz':
        submitData.append('question', formData.question);
        submitData.append('correct', formData.correct);
        submitData.append('option1', formData.option1);
        submitData.append('option2', formData.option2);
        if (formData.option3) {
          submitData.append('option3', formData.option3);
        }
        break;
    }

    // Add tags
    if (formData.tags && formData.tags.length > 0) {
      submitData.append('tags', JSON.stringify(formData.tags));
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stories/editStory', {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setOpenModal(null);
          setEditingStory(null);
          setIsEditMode(false);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          if (editor) editor.commands.setContent('');
          // Refresh feedback stories
          mutateFeedback();
        }, 1200);
      } else {
        const errorData = await res.json();
        setIsSubmitting(false);
        alert('Failed to update story: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      setIsSubmitting(false);
      alert('Failed to update story');
    }
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setIsEditMode(false);
    setFormData({ tags: [], images: [], audio: null });
    setTagInput('');
    if (editor) editor.commands.setContent('');
    setOpenModal(null);
  };

  const handleOpenModal = (key: string) => {
    setOpenModal(key);
    setFormData({ tags: [], images: [], audio: null });
    setTagInput('');
    setSubmitted(false);
    if (editor && key === 'story') editor.commands.setContent('');
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    if (isEditMode) {
      setEditingStory(null);
      setIsEditMode(false);
    }
    setFormData({ tags: [], images: [], audio: null });
    setTagInput('');
    setSubmitted(false);
    if (editor) editor.commands.setContent('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (name === 'image' && type === 'file') {
      setImageError('');
      const fileList = Array.from(files || []);
      if (fileList.length > 4) {
        setImageError('You can upload up to 4 images only.');
        setFormData((prev: any) => ({ ...prev, images: [] }));
        return;
      }
      for (let file of fileList) {
        if ((file as File).size > 102400) {
          setImageError('Each image must be 100KB or less.');
          setFormData((prev: any) => ({ ...prev, images: [] }));
          return;
        }
      }
      setFormData((prev: any) => ({ ...prev, images: fileList }));
    } else if (name === 'audio' && type === 'file') {
      setAudioError('');
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setAudioError('Audio file must be 2MB or less.');
        setFormData((prev: any) => ({ ...prev, audio: null }));
        return;
      }
      setFormData((prev: any) => ({ ...prev, audio: file }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value,
      }));
    }
  };

  // Tags logic for Story
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev: any) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };
  const handleRemoveTag = (tag: string) => {
    setFormData((prev: any) => ({ ...prev, tags: prev.tags.filter((t: string) => t !== tag) }));
  };
  const handleTagSelect = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prev: any) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput('');
  };

  //handle submit for story
  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('tags', JSON.stringify(formData.tags));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stories/story', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });
      if (res.ok) {
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          setOpenModal(null);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          setShowSuccessModal(false);
          // Refresh feedback stories after submission
          mutateFeedback();
        }, 4000);
      } else {
        // Optionally show error
        setSubmitted(false);
        setIsSubmitting(false);
        alert('Failed to submit story.');
      }
    } catch (err) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert('Failed to submit story.');
    }
  };

  // Handle submit for picture-comic stories
  const handleSubmitPictureComic = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.images.length) {
      return;
    }
    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('title', formData.title);
    if (formData.description) {
      submitData.append('description', formData.description);
    }
    
    // Append each image file
    formData.images.forEach((image: File, index: number) => {
      submitData.append('image', image);
    });

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/stories/picture-comic', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });
      
      if (res.ok) {
        const result = await res.json();
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          setOpenModal(null);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          setImageError('');
          setShowSuccessModal(false);
          if (editor) editor.commands.setContent('');
          // Refresh feedback stories after submission
          mutateFeedback();
        }, 4000);
      } else {
        const errorData = await res.json();
        setSubmitted(false);
        setIsSubmitting(false);
        alert('Failed to submit picture-comic story: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert('Failed to submit picture-comic story.');
    }
  };

  // Handle submit for audio stories
  const handleSubmitAudio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.audio) {
      return;
    }
    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('title', formData.title);
    if (formData.description) {
      submitData.append('description', formData.description);
    }
    
    // Append audio file
    submitData.append('audio', formData.audio);

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/stories/audio', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });
      
      if (res.ok) {
        const result = await res.json();
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          setOpenModal(null);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          setAudioError('');
          setShowSuccessModal(false);
          if (editor) editor.commands.setContent('');
          // Refresh feedback stories after submission
          mutateFeedback();
        }, 4000);
      } else {
        const errorData = await res.json();
        setSubmitted(false);
        setIsSubmitting(false);
        alert('Failed to submit audio story: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert('Failed to submit audio story.');
    }
  };

  // Handle submit for poll stories
  const handleSubmitPoll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question || !formData.option1 || !formData.option2) {
      return;
    }
    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('question', formData.question);
    submitData.append('option1', formData.option1);
    submitData.append('option2', formData.option2);
    if (formData.option3) {
      submitData.append('option3', formData.option3);
    }
    if (formData.option4) {
      submitData.append('option4', formData.option4);
    }

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/stories/poll', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });
      
      if (res.ok) {
        const result = await res.json();
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          setOpenModal(null);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          setShowSuccessModal(false);
          if (editor) editor.commands.setContent('');
          // Refresh feedback stories after submission
          mutateFeedback();
        }, 4000);
      } else {
        const errorData = await res.json();
        setSubmitted(false);
        setIsSubmitting(false);
        alert('Failed to submit poll: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert('Failed to submit poll.');
    }
  };

  // Handle submit for trivia stories
  const handleSubmitTrivia = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question || !formData.correct || !formData.option1 || !formData.option2) {
      return;
    }
    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('question', formData.question);
    submitData.append('correct', formData.correct);
    submitData.append('option1', formData.option1);
    submitData.append('option2', formData.option2);
    if (formData.option3) {
      submitData.append('option3', formData.option3);
    }

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/stories/trivia', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });
      
      if (res.ok) {
        const result = await res.json();
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => {
          setOpenModal(null);
          setFormData({ tags: [], images: [], audio: null });
          setTagInput('');
          setSubmitted(false);
          setIsSubmitting(false);
          setShowSuccessModal(false);
          if (editor) editor.commands.setContent('');
          // Refresh feedback stories after submission
          mutateFeedback();
        }, 4000);
      } else {
        const errorData = await res.json();
        setSubmitted(false);
        setIsSubmitting(false);
        alert('Failed to submit trivia quiz: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      setSubmitted(false);
      setIsSubmitting(false);
      alert('Failed to submit trivia quiz.');
    }
  };

  const handleSubmit = (e: React.FormEvent, optionKey: string) => {
    e.preventDefault();
    // Final client-side validation before submit
    if (openModal === 'picture') {
      if (formData.images.length > 4) {
        setImageError('You can upload up to 4 images only.');
        return;
      }
      for (let file of formData.images) {
        if (file.size > 102400) {
          setImageError('Each image must be 100KB or less.');
          return;
        }
      }
      // Call the picture-comic specific handler
      handleSubmitPictureComic(e);
      return;
    }
    if (openModal === 'audio') {
      if (!formData.audio) {
        setAudioError('Audio file is required.');
        return;
      }
      if (formData.audio.size > 2 * 1024 * 1024) {
        setAudioError('Audio file must be 2MB or less.');
        return;
      }
      // Call the audio specific handler
      handleSubmitAudio(e);
      return;
    }
    if (openModal === 'poll') {
      if (!formData.question || !formData.option1 || !formData.option2) {
        alert('Question and at least two options are required.');
        return;
      }
      // Call the poll specific handler
      handleSubmitPoll(e);
      return;
    }
    if (openModal === 'quiz') {
      if (!formData.question || !formData.correct || !formData.option1 || !formData.option2) {
        alert('Question, correct answer, and at least two options are required.');
        return;
      }
      // Call the trivia specific handler
      handleSubmitTrivia(e);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setOpenModal(null);
      setFormData({ tags: [], images: [], audio: null });
      setTagInput('');
      setSubmitted(false);
      setImageError('');
      setAudioError('');
      if (editor) editor.commands.setContent('');
    }, 1200);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 bg-white">
          <h1 className="text-4xl font-bold text-brown mb-8 tracking-widest text-center">CREATE</h1>
          
          {/* Feedback Section */}
          {feedbackStories.length > 0 && (
            <div className="w-full max-w-6xl mb-8">
              <div className="bg-gradient-to-r from-gold/10 to-brown/10 rounded-2xl p-6 border border-gold/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FaComments className="text-2xl text-brown" />
                    <h2 className="text-2xl font-bold text-brown flex items-center gap-2">
                      Feedback & Reviews
                      <span className="ml-2 px-3 py-1 rounded-full bg-brown text-white text-sm font-semibold">{feedbackStories.length}</span>
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowFeedback(!showFeedback)}
                    className="text-brown hover:text-gold transition-colors"
                  >
                    {showFeedback ? 'Hide' : 'Show'} Feedback
                  </button>
                </div>
                
                {showFeedback && (
                  <div className="space-y-4">
                    {feedbackStories.map((story: any) => (
                      <div key={story.story_id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getStoryTypeIcon(story.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900">{story.title}</h3>
                              <p className="text-sm text-gray-500">{getStoryTypeLabel(story.type)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(story.status)}`}>
                              {getStatusIcon(story.status)}
                              <span className="capitalize">{story.status}</span>
                            </div>
                            <button
                              onClick={() => handleEditStory(story)}
                              className="px-3 py-1 bg-gold text-brown rounded-lg hover:bg-brown hover:text-white transition-colors text-sm font-medium"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <FaComments className="text-brown" />
                            <span className="font-medium text-gray-700">Admin Feedback:</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{story.admin_feedback}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Submitted: {new Date(story.created_at).toLocaleDateString()}</span>
                          <span>Updated: {new Date(story.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="w-full max-w-6xl mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-brown font-medium">Create New Content</span>
              </div>
            </div>
          </div>

          {/* Story Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {storyOptions.map((option, index) => (
              <div key={option.key}>
                <div
                  className="bg-white border-2 border-gold/30 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gold/10 hover:border-gold transition-all duration-200 min-h-[200px] group"
                  onClick={() => handleOpenModal(option.key)}
                >
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {option.icon}
                  </div>
                  <h2 className="text-lg font-bold text-black mb-2 text-center">{option.title}</h2>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">{option.description}</p>
                </div>
                
                {/* Add divider after every 3rd item (except the last one) */}
                {index % 3 === 2 && index < storyOptions.length - 1 && (
                  <div className="hidden lg:block mt-6">
                    <div className="w-full border-t border-gold/20"></div>
                  </div>
                )}
              </div>
            ))}
            {/* Stats Tile */}
            <StatsTile />
          </div>

          {/* Modal */}
          {openModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative animate-slide-up max-h-[90vh] flex flex-col">
                <div className="flex-shrink-0 p-6 pb-4">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={handleCloseModal}
                  >
                    <FaTimes />
                  </button>
                  <h3 className="text-2xl font-bold text-brown mb-4 text-center">
                    {isEditMode ? `Edit ${storyOptions.find(opt => opt.key === openModal)?.title}` : storyOptions.find(opt => opt.key === openModal)?.title}
                  </h3>
                </div>
                
                {submitted ? (
                  <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center text-green-600 font-bold">
                      {isEditMode ? 'Updated! 🎉' : 'Submitted! 🎉'}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-6 pb-4">
                      <form onSubmit={isEditMode ? handleSaveEdit : (openModal === 'story' ? handleSubmitStory : e => handleSubmit(e, openModal))} className="space-y-4">
                        {/* Story Option: Title, Tags, Description (Tiptap) */}
                        {openModal === 'story' && editor && (
                          <>
                            <div>
                              <label className="block text-gray-700 mb-1 font-medium">Title<span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2 text-black"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 font-medium">Tags</label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map((tag: string) => (
                                  <span key={tag} className="bg-gold text-brown px-2 py-1 rounded-full flex items-center gap-1 text-sm">
                                    {tag}
                                    <button type="button" className="ml-1 text-xs" onClick={() => handleRemoveTag(tag)}>&times;</button>
                                  </span>
                                ))}
                              </div>
                              <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInput}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Type and press Enter to add tag"
                                className="w-full border rounded px-3 py-2 text-black mb-2"
                              />
                              <div className="flex flex-wrap gap-2">
                                {availableTags.filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()) && !formData.tags.includes(tag)).map(tag => (
                                  <button
                                    key={tag}
                                    type="button"
                                    className="bg-gray-100 hover:bg-gold text-brown px-2 py-1 rounded-full text-xs"
                                    onClick={() => handleTagSelect(tag)}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1 font-medium">Description<span className="text-red-500">*</span></label>
                              <div className="border border-gray-300 rounded-lg">
                                {/* Toolbar */}
                                <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2 bg-gray-50">
                                  <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('bold') ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Bold"
                                  >
                                    <FaBold size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('italic') ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Italic"
                                  >
                                    <FaItalic size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('heading', { level: 2 }) ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Heading"
                                  >
                                    <FaHeading size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('bulletList') ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Bullet List"
                                  >
                                    <FaListUl size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('orderedList') ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Numbered List"
                                  >
                                    <FaListOl size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (typeof window !== 'undefined') {
                                        const url = window.prompt('Enter the URL');
                                        if (url) {
                                          editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                                        }
                                      }
                                    }}
                                    className={`p-2 rounded transition-colors ${editor?.isActive('link') ? 'bg-gold text-white' : 'hover:bg-gold hover:bg-opacity-20 text-brown'}`}
                                    title="Add Link"
                                  >
                                    <FaLink size={14} />
                                  </button>
                                </div>
                                <EditorContent editor={editor} className="prose prose-sm max-w-none [&_.ProseMirror]:text-black [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:text-black [&_.ProseMirror_h1]:text-black [&_.ProseMirror_h2]:text-black [&_.ProseMirror_h3]:text-black [&_.ProseMirror_li]:text-black [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror]:min-h-[150px] p-2" />
                              </div>
                            </div>
                          </>
                        )}
                        {/* Picture/Comic Story Option */}
                        {openModal === 'picture' && (
                          <>
                            <div className="text-sm text-brown mb-2 font-semibold">
                              You can upload up to 4 images. Each image must be 100KB or less.
                            </div>
                            {imageError && <div className="text-red-600 text-sm mb-2">{imageError}</div>}
                            {storyOptions.find(opt => opt.key === 'picture')?.fields.map(field => (
                              <div key={field.name}>
                                <label className="block text-gray-700 mb-1 font-medium">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                                {field.name === 'image' ? (
                                  <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    multiple
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black"
                                  />
                                ) : field.type === 'textarea' ? (
                                  <textarea
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black min-h-[80px] resize-y"
                                  />
                                ) : (
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black"
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        )}
                        {/* Audio Story Option */}
                        {openModal === 'audio' && (
                          <>
                            <div className="text-sm text-brown mb-2 font-semibold">
                              You can upload one audio file. The audio file must be 2MB or less.
                            </div>
                            {audioError && <div className="text-red-600 text-sm mb-2">{audioError}</div>}
                            {storyOptions.find(opt => opt.key === 'audio')?.fields.map(field => (
                              <div key={field.name}>
                                <label className="block text-gray-700 mb-1 font-medium">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                                {field.name === 'audio' ? (
                                  <input
                                    type="file"
                                    name="audio"
                                    accept="audio/*"
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black"
                                  />
                                ) : field.type === 'textarea' ? (
                                  <textarea
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black min-h-[80px] resize-y"
                                  />
                                ) : (
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="w-full border rounded px-3 py-2 text-black"
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        )}
                        {/* Poll Option */}
                        {openModal === 'poll' && (
                          <>
                            {storyOptions.find(opt => opt.key === 'poll')?.fields.map(field => (
                              <div key={field.name}>
                                <label className="block text-gray-700 mb-1 font-medium">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                                <input
                                  type="text"
                                  name={field.name}
                                  value={formData[field.name] || ''}
                                  onChange={handleChange}
                                  required={field.required}
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>
                            ))}
                          </>
                        )}
                        {/* Trivia Quiz Option */}
                        {openModal === 'quiz' && (
                          <>
                            {storyOptions.find(opt => opt.key === 'quiz')?.fields.map(field => (
                              <div key={field.name}>
                                <label className="block text-gray-700 mb-1 font-medium">{field.label}{field.required && <span className="text-red-500">*</span>}</label>
                                <input
                                  type="text"
                                  name={field.name}
                                  value={formData[field.name] || ''}
                                  onChange={handleChange}
                                  required={field.required}
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>
                            ))}
                          </>
                        )}
                      </form>
                    </div>
                    
                    {/* Fixed Button Section */}
                    <div className="flex-shrink-0 p-6 pt-0">
                      <div className="flex gap-3">
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex-1 px-6 py-2 rounded-lg transition-colors font-bold bg-gray-300 text-gray-700 hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          form={openModal === 'story' ? undefined : undefined}
                          onClick={isEditMode ? undefined : (openModal === 'story' ? handleSubmitStory : e => handleSubmit(e, openModal))}
                          className={`flex-1 px-6 py-2 rounded-lg transition-colors font-bold flex items-center justify-center gap-2 ${
                            submitted || isSubmitting
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                              : 'bg-gold text-black hover:bg-brown hover:text-white'
                          }`}
                          disabled={submitted || isSubmitting}
                        >
                          {submitted ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              {isEditMode ? 'Updated! 🎉' : 'Submitted! 🎉'}
                            </>
                          ) : isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              {isEditMode ? 'Updating...' : 'Submitting...'}
                            </>
                          ) : (
                            isEditMode ? 'Save Changes' : 'Submit for Review'
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Story Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-4">Your story has been submitted and is now under review.</p>
                  <p className="text-gray-600 mb-6">Check your notifications to find feedback on your stories.</p>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="block w-full bg-brown text-white py-3 px-6 rounded-lg font-medium hover:bg-brown/90 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

function StatsTile() {
  const { data, error, isLoading } = useSWR(
    typeof window !== 'undefined' && localStorage.getItem('token') ? '/api/stories/getReport' : null,
    (url) => {
      if (typeof window === 'undefined') return Promise.resolve(null);
      return fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => res.json());
    },
    { refreshInterval: 10000 }
  );
  if (isLoading) return (
    <div className="bg-white border-2 border-gold/30 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 min-h-[200px]">
      <span className="text-brown font-bold text-lg">Loading stats...</span>
    </div>
  );
  if (error || !data) return (
    <div className="bg-white border-2 border-gold/30 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 min-h-[200px]">
      <span className="text-red-600 font-bold text-lg">Failed to load stats</span>
    </div>
  );
  return (
    <div className="bg-white border-2 border-gold/30 rounded-xl shadow-sm flex flex-col items-center justify-center p-6 min-h-[200px]">
      <h3 className="text-lg font-bold text-brown mb-2">Your Story Stats</h3>
      <div className="text-black text-sm mb-2">Total Stories: <span className="font-bold">{data.totalStories}</span></div>
      <div className="text-black text-sm mb-2">Under Review: <span className="font-bold text-yellow-600">{data.totalDraft}</span></div>
      <div className="w-full mb-2">
        <div className="font-semibold text-brown text-sm mb-1">Approved:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Total: {data.totalApproved}</span>
          <span className="bg-gold/10 text-brown px-2 py-1 rounded-full text-xs">Text: {data.approvedByType.story}</span>
          <span className="bg-gold/10 text-brown px-2 py-1 rounded-full text-xs">Picture: {data.approvedByType.picture_comic}</span>
          <span className="bg-gold/10 text-brown px-2 py-1 rounded-full text-xs">Audio: {data.approvedByType.audio}</span>
          <span className="bg-gold/10 text-brown px-2 py-1 rounded-full text-xs">Poll: {data.approvedByType.poll}</span>
          <span className="bg-gold/10 text-brown px-2 py-1 rounded-full text-xs">Trivia: {data.approvedByType.trivia_quiz}</span>
        </div>
      </div>
      <div className="w-full mb-2">
        <div className="font-semibold text-brown text-sm mb-1">With Feedback:</div>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{data.totalWithFeedback}</span>
      </div>
    </div>
  );
}