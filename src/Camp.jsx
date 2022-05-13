import BookingModal from './BookingModal.js'

const Camp = () => {
    return (
        <>
            <div className="main-container">
                <div className="camp-pic-container">
                    <div className="camp-pic">
                        <img src="../assets/img/camp-card1.jpg" alt="camp-pic" />
                    </div>

                </div>
                <div className="camp-info">
                    <div className="camp-title">
                        <h1>SAN SEBASTIAN CAMP</h1>
                    </div>
                    <div className="camp-location">
                        <div className="gps-icon">
                            <img src="../assets/img/gps-icon.png" alt="" />
                        </div>
                        <h2>San Sebastian, Spain</h2>
                    </div>

                    <div className="camp-description">
                        <p>San Sebastian camp is the perfect camp for your kids Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Tempore natus odit explicabo libero ducimus optio laboriosam vel nihil fuga
                            officia animi voluptas architecto recusandae doloremque repellendus, necessitatibus blanditiis
                            nesciunt asperiores.</p>
                    </div>
                    <div className="camp-filters">
                        <div className="camp-type">
                            <div className="type-icon">
                                <img src="../assets/img/type-icon.png" alt="type-icon" />
                            </div>
                            <h4>camp type |</h4>
                            <p>Art</p>
                        </div>
                        <div className="permited-age">
                            <div className="age-icon">
                                <img src="../assets/img/age-icon.png" alt="age-icon" />
                            </div>
                            <h4>Age |</h4>
                            <p>3-6 years</p>
                        </div>
                        <div className="camp-languages">
                            <div className="language-icon">
                                <img src="../assets/img/languages-icon.png" alt="languages-icon" />
                            </div>
                            <h4>Languages |</h4>
                            <p>English </p>
                            <span> / </span>
                            <p> Spanish</p>
                        </div>
                    </div>
                    <div className="booking">
                        <button>Booking</button>
                    </div>
                </div>
                <div className="camp-activities">
                    <div className="activity-title">
                        <h1>ACTIVITIES</h1>
                    </div>
                    <div className="activity-container">
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-climbing-50.png" alt="activity-pic" />
                            </div>
                            <p>Climbing Hills</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-cycling-50.png" alt="activity-pic" />
                            </div>
                            <p>Cycling / Mountain Biking</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-dinghy-50.png" alt="activity-pic" />
                            </div>
                            <p>Kyaking</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-fisherman-in-a-boat-50.png" alt="activity-pic" />
                            </div>
                            <p>Fishing</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-horseback-riding-50.png" alt="activity-pic" />
                            </div>
                            <p>Horseback Riding</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-kicking-50.png" alt="activity-pic" />
                            </div>
                            <p>Kick Boxing / Karate</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-scuba-diving-50.png" alt="activity-pic" />
                            </div>
                            <p>Swiming / Scuba Diving</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-surf-50.png" alt="activity-pic" />
                            </div>
                            <p>Surfing</p>
                        </div>
                        <div className="activity-card">
                            <div className="activity-pic">
                                <img src="../assets/img/icons8-goalkeeper-50.png" alt="activity-pic" />
                            </div>
                            <p>Foot ball</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logged Section */}
            <BookingModal />
        </>
    )
} 