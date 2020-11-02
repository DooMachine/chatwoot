import { buildSearchParamsWithLocale } from '../helpers/urlParamsHelper';

const sendMessage = ({ content, conversationId }) => {
  const referrerURL = window.referrerURL || '';
  const search = buildSearchParamsWithLocale(window.location.search);
  return {
    url: `/api/v1/widget/conversations/${conversationId}/messages${search}`,
    params: {
      message: {
        content,
        timestamp: new Date().toString(),
        referer_url: referrerURL,
      },
    },
  };
};

const sendAttachment = ({ attachment, conversationId }) => {
  const { referrerURL = '' } = window;
  const timestamp = new Date().toString();
  const { file } = attachment;

  const formData = new FormData();
  formData.append('message[attachments][]', file, file.name);
  formData.append('message[referer_url]', referrerURL);
  formData.append('message[timestamp]', timestamp);
  return {
    url: `/api/v1/widget/conversations/${conversationId}/messages${window.location.search}`,
    params: formData,
  };
};

const getMessages = ({ before, conversationId }) => ({
  url: `/api/v1/widget/conversations/${conversationId}/messages${window.location.search}`,
  params: { before },
});

const updateMessage = id => ({
  url: `/api/v1/widget/messages/${id}${window.location.search}`,
});

const getAvailableAgents = token => ({
  url: '/api/v1/widget/inbox_members',
  params: {
    website_token: token,
  },
});

export default {
  sendMessage,
  sendAttachment,
  getMessages,
  updateMessage,
  getAvailableAgents,
};
