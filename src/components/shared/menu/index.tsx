export const TopMenu = () => {
    return (
        <div className="container-fluid">
            <div className="navbar bg-base-300 rounded-md  bg-opacity-50 backdrop-blur-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            //@ts-ignore
                            tabIndex="0"
                            className="btn btn-ghost btn-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>
                        <ul
                            //@ts-ignore
                            tabIndex="0"
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Home</a>
                            </li>
                            <li>
                                <a>Saved Locations</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className=" normal-case text-xl text-orange-400  font-extrabold">
                        Notus. 
                    </a>
                </div>
                <div className="navbar-end">
                    {/* <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button> */}
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div> Connect Wallet.
                    </button>
                </div>
            </div>
        </div>
    );
};
