// eslint-disable-next-line import/extensions
import { Link } from 'react-router-dom';
import { useState } from 'react';
import experienceList from './constants/index';

function Home() {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <>
            <div className="bg-black">
                <div className="flex justify-center pt-16 pb-20 relative">
                <img
                    src="/home1.jpg"
                    alt="home1Image"
                    className={`rounded-3xl w-3/4 transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-50' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                    <div
                        className={`text-2xl md:text-6xl text-white font-light tracking-wide italic transition-opacity duration-500 ${
                        imageLoaded
                            ? 'animate-fade-up opacity-100'
                            : 'opacity-0'
                        }`}
                        style={{
                        animationDelay: imageLoaded ? '700ms' : '0ms',
                        }}
                    >
                        The best place to find and share your next meal
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <h2 className="flex pt-24 pb-12 justify-center text-2xl md:text-4xl font-bold">
                Dinebnb Experiences
            </h2>
            <div className="md:flex justify-evenly pb-24">
                {experienceList.map((item) => (
                    <Link to={item.url} className="w-1/2">
                        <figure className="relative h-96 px-10 hover:drop-shadow-2xl py-5">
                            <img
                                className="drop-shadow-2xl h-full w-full rounded-xl object-cover object-center"
                                src={item.img}
                                alt="nature"
                                loading="lazy"
                            />
                            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                <div>
                                    <div className="text-black text-lg">
                                        {item.mainText}
                                    </div>
                                    <div className="text-gray-700">
                                        {item.subtext}
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </Link>
                ))}

                {/* <div>Share Your Special Eatery</div> */}
            </div>
        </>

    );
}

export default Home;
