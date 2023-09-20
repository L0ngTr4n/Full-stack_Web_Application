document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper for the blog slider
  const blogSlider = new Swiper(".blog-slider", {
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // When the viewport width is 768px or larger
      768: {
        slidesPerView: 2,
      },
      // When the viewport width is 992px or larger
      992: {
        slidesPerView: 3,
      },
      // When the viewport width is 1200px or larger
      1200: {
        slidesPerView: 4,
      },
    },
  });
  

  // Sample blog post data
  const blogPosts = [
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/1.webp",
      date: "23.12.2022",
      title: "How to promote brands",
      description: "When you enter into any new area of science, you almost reach",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/2.webp",
      date: "15.01.2023",
      title: "The future of artificial intelligence",
      description: "Artificial intelligence is rapidly advancing, and its impact on various industries is profound.",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/3.webp",
      date: "10.02.2023",
      title: "Exploring the wonders of nature",
      description: "Nature has always been a source of inspiration and awe for humans. Let's take a journey into the natural world.",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/4.webp",
      date: "05.03.2023",
      title: "The art of storytelling",
      description: "Storytelling is an ancient and powerful way to convey information and connect with others.",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/1.webp",
      date: "23.12.2022",
      title: "How to promote brands",
      description: "When you enter into any new area of science, you almost reach",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/2.webp",
      date: "15.01.2023",
      title: "The future of artificial intelligence",
      description: "Artificial intelligence is rapidly advancing, and its impact on various industries is profound.",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/3.webp",
      date: "10.02.2023",
      title: "Exploring the wonders of nature",
      description: "Nature has always been a source of inspiration and awe for humans. Let's take a journey into the natural world.",
    },
    {
      imgSrc: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/4.webp",
      date: "05.03.2023",
      title: "The art of storytelling",
      description: "Storytelling is an ancient and powerful way to convey information and connect with others.",
    },
    //add more blog posts here
  ];
  

  // Function to generate HTML for a single blog post
  function createBlogPostElement(post) {
    return `
      <div class="swiper-slide">
        <div class="blog-post">
          <a href="#" class="img-fluid">
            <img class="rounded w-100" src="${post.imgSrc}" style="object-fit: cover; max-height: 180px;" />
          </a>
          <div class="mt-2 text-muted small d-block mb-1">
            <span>
              <i class="fa fa-calendar-alt fa-sm"></i>
              ${post.date}
            </span>
            <a href="#">
              <h6 class="text-dark">${post.title}</h6>
            </a>
            <p>${post.description}</p>
          </div>
        </div>
      </div>
    `;
  }
  

  // Loop through blog post data and add them to the slider
  for (const post of blogPosts) {
    const blogPostElement = createBlogPostElement(post);
    document.querySelector(".swiper-wrapper").insertAdjacentHTML("beforeend", blogPostElement);
  }

  // Find the tallest blog post and set its height to all blog posts
  const blogPostElements = document.querySelectorAll(".blog-post");
  let maxHeight = 0;
  blogPostElements.forEach((element) => {
    const elementHeight = element.clientHeight;
    maxHeight = Math.max(maxHeight, elementHeight);
  });
  blogPostElements.forEach((element) => {
    element.style.minHeight = `${maxHeight}px`;
  });
});
