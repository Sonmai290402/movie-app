import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      console.log(contentType);
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content || []);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
export default useGetTrendingContent;
