<template>
  <div class="container mt-7">
    <!-- 01 Heading -->
    <h1>The Blog</h1>

    <!-- 02 Featured Post -->
    <div class="row">
      <div class="col">
        <div class="card my-4">
          <div class="row g-0 height-400 overflow-hidden">
            <div class="col-md-6 col-lg-7">
              <img
                src="../assets/demo-post.jpg"
                class="img-fluid rounded-3 w-100 h-100 height-400 cover-img"
                alt="demo-post"
              />
            </div>
            <div class="col-md-6 col-lg-5">
              <div class="card-body">
                <p class="card-text">
                  <small class="text-muted">March 02, 2021</small>
                </p>
                <h5 class="card-title h2 pb-3">
                  Learn Python In 30 Minutes - In Depth Guide
                </h5>
                <p class="card-text custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae iste ex adipisci cumque architecto explicabo quas,
                  dolores quibusdam sapiente fugit repellat expedita sint,
                  maiores assumenda.iAnmi eos voluptatibus placeat nisi. This is
                  a wider card with supporting text below as a natural lead-in
                  to additional content. This content is a little bit longer.
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer. Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Voluptates ex animi earum ipsum quos esse, doloremque
                  asperiores quasi tenetur praesentium temporibus, veniam
                  dignissimos error quo autem libero officiis, beatae
                  architecto.
                </p>
                <a href="#" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 03 Recent Posts -->
  </div>
</template>

<script>
export default {}
</script>

<style>
.cover-img {
  object-fit: cover;
}

.custom-paragraph {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>
