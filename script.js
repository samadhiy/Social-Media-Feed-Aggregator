const feedContainer = document.getElementById("feed-container");

// Load JSON files
Promise.all([
    fetch("data/youtube.json").then(res => res.json()),
    fetch("data/twitter.json").then(res => res.json())
])
.then(([youtubeData, twitterData]) => {

    // Normalize YouTube data
    const youtubeFeeds = youtubeData.items.map(item => ({
        platform: "YouTube",
        title: item.title,
        image: item.thumbnail,
        date: item.publishedAt,
        link: item.url
    }));

    // Normalize Twitter data
    const twitterFeeds = twitterData.tweets.map(tweet => ({
        platform: "Twitter",
        title: tweet.text,
        image: tweet.image,
        date: tweet.created_at,
        link: tweet.link
    }));

    // Merge all feeds
    const allFeeds = [...youtubeFeeds, ...twitterFeeds];

    // Display feeds
    allFeeds.forEach(feed => {
        const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
    <div class="platform ${feed.platform}">${feed.platform}</div>
    <img src="${feed.image}" alt="Post Image">
    <div class="title">${feed.title}</div>
    <div class="date">${feed.date}</div>
    <a href="${feed.link}" target="_blank">View Post</a>
 `;

        feedContainer.appendChild(card);
    });
})
.catch(error => console.error("Error loading feeds:", error));
