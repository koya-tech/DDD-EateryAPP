import { ImTwitter, ImGithub } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
// eslint-disable-next-line import/extensions
import { Link } from 'react-router-dom';
import { routeList, serviceInfoList } from '../constants/index';

function Footer() {
    return (
        <footer className="bg-black text-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Main footer content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Links Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Link</h3>
                <ul className="space-y-2">
                {routeList.map((item) => (
                    <li key={item.route}>
                    <Link
                        to={item.route}
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                        {item.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Products Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                {serviceInfoList.map((item) => (
                    <li key={item.route}>
                    <Link
                        to={item.route}
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                        {item.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* Contact Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="text-slate-400">
                <p>お問い合わせ：</p>
                <a
                    href="mailto:contact@koya-tech.com"
                    className="hover:text-white transition-colors duration-200"
                >
                    contact@koya-tech.com
                </a>
                </div>
            </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800 my-8" />

            {/* Bottom footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-400">
                        Copyright ©
                        {new Date().getFullYear()}
                        {' '}
                        Koya-tech
            </p>
            {/* Social links */}
            <div className="flex items-center space-x-6">
                <a
                href="https://x.com/koya_tech"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
                data-testid="twitter-icon"
                >
                <ImTwitter className="w-5 h-5" />
                </a>
                <a
                href="https://github.com/koya-tech"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
                data-testid="github-icon"
                >
                <ImGithub className="w-5 h-5" />
                </a>
                <a
                href="https://www.linkedin.com/in/koya-hiura-9aa75b31a/"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Portfolio"
                data-testid="portfolio-icon"
                >
                <FaUser className="w-5 h-5" />
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer;
