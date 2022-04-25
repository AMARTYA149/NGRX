import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.actions';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postForm!: FormGroup;
  postSubscription!: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.postSubscription = this.store
    //     .select(getPostById, { id })
    //     .subscribe((data) => {
    //       this.post = data;
    //       this.createForm();
    //       console.log(this.post);
    //     });
    // });
    this.createForm();
    this.postSubscription = this.store.select(getPostById).subscribe((post) => {
      this.post = post!;
      this.postForm.patchValue({
        title: post?.title,
        description: post?.description,
      });
    });
  }

  onUpdatePost() {}

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    //dispatch the update action
    this.store.dispatch(setLoadingSpinner({ status: true }));

    this.store.dispatch(updatePost({ post }));

    // this.router.navigate(['posts']);
  }
}
