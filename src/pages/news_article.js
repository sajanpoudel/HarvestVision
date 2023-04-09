import demoNews from "../assets/demo_news.webp"

const News = () => {
    return         <section>
    <h2 class="heading2">News</h2>
    <div id="news-container">
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 1"/>
                <h3>Three ways mobile is helping farmers in Kenya</h3>
                <p>After the harvest, farmers search for the buyer that will pay the highest price for their crops. Many farmers lack information about prices and market demand ...</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 2"/>
                <h3>Three ways mobile is helping farmers in Kenya</h3>
                <p>News 2 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 3"/>
                <h3>News 3 Title</h3>
                <p>News 3 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 4"/>
                <h3>News 4 Title</h3>
                <p>News 4 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 5"/>
                <h3>News 5 Title</h3>
                <p>News 5 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 6"/>
                <h3>News 6 Title</h3>
                <p>News 6 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 7"/>
                <h3>News 7 Title</h3>
                <p>News 7 Description</p>
            </a>
        </div>
        <div class="news-item">
            <a href="news-article.html">
                <img src={demoNews} alt="News 8"/>
                <h3>News 8 Title</h3>
                <p>News 8 Description</p>
            </a>
        </div>

    </div>
    <button id="load-more-btn" onclick="loadMoreNews()">Load More</button>

</section>
} 
export default News