<template>
  <div class="container mt-7">
    <!-- 01 Heading -->
    <h1>The Blog</h1>

    <!-- 02 Recent Posts -->

    <div class="row g-4 mt-4">
      <div class="col-12 mb-0 mb-sm-3">
        <div class="row g-0">
          <div class="col-sm-6 ps-sm-0 d-flex align-items-center">
            <div class="card-image cursor-pointer h-100 w-100 ratio ratio-16x9">
              <img
                class="
                  shadow-lg
                  border-radius-top-end-2xl
                  border-radius-top-end-md-0
                  border-radius-top-start-2xl
                  border-radius-bottom-start-md-2xl
                  img-fluid
                  cover-img
                "
                src="@/assets/demo-post.jpg"
              />
            </div>
          </div>
          <div
            class="
              shadow-lg
              border-radius-bottom-start-2xl
              border-radius-bottom-start-md-0
              border-radius-bottom-end-2xl
              border-radius-top-end-md-2xl
              border-radius-top-end-0
              border-radius-top-start-0
              border-radius-bottom-start-0
              col-sm-6
              ps-sm-0
              card
            "
          >
            <div class="card-body">
              <p class="card-text">
                <small class="text-muted">March 02, 2021</small>
              </p>
              <h3 class="card-title pb-3">
                Learn Python In 30 Minutes - In Depth Guide
              </h3>
              <p class="card-text custom-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae iste ex adipisci cumque architecto explicabo quas,
                dolores quibusdam sapiente fugit repellat expedita sint, maiores
                assumenda.iAnmi eos voluptatibus placeat nisi. This is a wider
                card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer. This is
                a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
                ex animi earum ipsum quos esse, doloremque asperiores quasi
                tenetur praesentium temporibus, veniam dignissimos error quo
                autem libero officiis, beatae architecto.
              </p>
              <a href="#" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="card">
          <div class="card-image">
            <img class="img-fluid" src="/images/img-1.jpg" alt="" />
          </div>
          <div class="card-body">
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit quaerat qui voluptatem modi ab, minus quibusdam iste
              libero rem neque voluptatibus nisi ea accusantium, totam
              voluptatum. Totam tempora commodi officiis.
            </p>
          </div>
        </div>
      </div>
    </div>
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
