<script lang="ts">
  import { Container } from "$lib/components/ui";
  import { Mark } from "$lib/components";
</script>

<Container>
  <div class="h-16 w-16">
    <Mark state="mark" player="player1" />
  </div>
  <div class="h-20 w-20">
    <Mark state="mark" player="player1" />
  </div>
  <div class="h-32 w-32">
    <Mark state="mark" player="player1" />
  </div>
  <Mark state="mark" player="player1" />
  <div class="h-16 w-16">
    <Mark state="mark" player="player2" />
  </div>
  <div class="h-20 w-20">
    <Mark state="mark" player="player2" />
  </div>
  <div class="h-32 w-32">
    <Mark state="mark" player="player2" />
  </div>
  <Mark state="mark" player="player2" />
</Container>
