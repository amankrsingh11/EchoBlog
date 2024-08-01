import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData?.$id : false;

    useEffect(() => {
        let isMounted = true;
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (isMounted) {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                    setLoading(false);
                }
            }).catch(() => {
                if (isMounted) {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }

        return () => {
            isMounted = false;
        };
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4">
                    <div className="w-full flex relative border rounded-xl p-4 shadow-md">
                        <div className="w-1/2">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl w-full h-auto"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center items-center px-6">
                            <h1 className="text-2xl font-bold mb-4 text-center">{post.title}</h1>
                            <div className="browser-css mb-4 text-center">
                                {parse(post.content)}
                            </div>
                        </div>
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
